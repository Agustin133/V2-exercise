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
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const report_service_1 = __importDefault(require("../services/report.service"));
class Report {
    generateReport(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { startDate, endDate } = _req.query;
                if (!startDate || !endDate) {
                    throw new Error('Please provide both startDate and endDate');
                }
                const start = new Date(startDate);
                const end = new Date(endDate);
                const transaction = yield report_service_1.default.generateReport(start, end);
                res.status(200).json(transaction);
            }
            catch (err) {
                (0, errorHandler_1.default)(err, res);
            }
        });
    }
}
exports.default = new Report();
