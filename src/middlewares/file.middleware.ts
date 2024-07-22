import { Request, Response } from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import CsvData, { IUser } from '../models/csvModel';

// Configure multer to store in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadCsv = upload.single('csv');

const parseAndSaveCsv = async (buffer: Buffer) => {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
        const stream = bufferToStream(buffer);
        stream.pipe(csvParser())
            .on('data', (data: IUser) => {
                results.push({
                    nombre: data.nombre,
                    email: data.email,
                    id: data.id,
                    creditos: 0
                });
            })
            .on('end', async () => {
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
                        await CsvData.bulkWrite(bulkOps); // Is used to batch the operations. This reduces the number of individual database operations and leverages MongoDB's bulk operations for better performance.
                        console.log('Nuevos usuarios insertados/actualizados en la base de datos');
                    }
                    resolve(results);
                } catch (error) {
                    console.error('Error insertando usuarios en la base de datos:', error);
                    reject(error);
                }
            });
    });
};

const bufferToStream = (buffer: Buffer) => {
    const readable = new (require('stream').Readable)();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    return readable;
};

export const handleFileUpload = async (req: Request, res: Response) => {
    uploadCsv(req, res, async (err) => {
        if (err) {
            console.error('Error en la carga del archivo:', err);
            return res.status(400).send({ error: err.message });
        }

        const fileBuffer = req.file?.buffer;
        if (!fileBuffer) {
            console.error('No se subió ningún archivo');
            return res.status(400).send({ error: 'No file uploaded' });
        }

        try {
            await parseAndSaveCsv(fileBuffer);
            res.status(200).send({ message: 'File data saved into database' });
        } catch (err) {
            console.error('Error al analizar y guardar el archivo CSV:', err);
            if (err instanceof Error) {
                res.status(500).send({ error: err.message });
            } else {
                res.status(500).send({ error: 'Unknown error occurred' });
            }
        }
    });
};
