"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const csvModel_1 = __importDefault(require("../models/csvModel"));
// Configure multer to store in memory
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const uploadCsv = upload.single('csv');
const parseAndSaveCsv = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    return new Promise((resolve, reject) => {
        const stream = bufferToStream(buffer);
        stream.pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            results.push({
                nombre: data.nombre,
                email: data.email,
                id: data.id,
                creditos: 0
            });
        })
            .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (results.length > 0) {
                    const bulkOps = results.map(user => ({
                        updateOne: {
                            filter: { email: user.email },
                            update: {
                                $set: {
                                    nombre: user.nombre,
                                    id: user.id,
                                    creditos: 0
                                }
                            },
                            upsert: true
                        }
                    }));
                    yield csvModel_1.default.bulkWrite(bulkOps); // Is used to batch the operations. This reduces the number of individual database operations and leverages MongoDB's bulk operations for better performance.
                    console.log('Nuevos usuarios insertados/actualizados en la base de datos');
                }
                resolve(results);
            }
            catch (error) {
                console.error('Error insertando usuarios en la base de datos:', error);
                reject(error);
            }
        }));
    });
});
const bufferToStream = (buffer) => {
    const readable = new (require('stream').Readable)();
    readable._read = () => { };
    readable.push(buffer);
    readable.push(null);
    return readable;
};
const handleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    uploadCsv(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (err) {
            console.error('Error en la carga del archivo:', err);
            return res.status(400).send({ error: err.message });
        }
        const fileBuffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        if (!fileBuffer) {
            console.error('No se subió ningún archivo');
            return res.status(400).send({ error: 'No file uploaded' });
        }
        try {
            yield parseAndSaveCsv(fileBuffer);
            res.status(200).send({ message: 'File data saved into database' });
        }
        catch (err) {
            console.error('Error al analizar y guardar el archivo CSV:', err);
            if (err instanceof Error) {
                res.status(500).send({ error: err.message });
            }
            else {
                res.status(500).send({ error: 'Unknown error occurred' });
            }
        }
    }));
});
exports.handleFileUpload = handleFileUpload;
