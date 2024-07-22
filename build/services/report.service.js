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
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
class Report {
    generateReport(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionModel_1.default.aggregate([
                    {
                        $match: {
                            date: { $gte: start, $lte: end },
                        },
                    },
                    {
                        $group: {
                            _id: { senderId: '$senderId', receiverId: '$receiverId' },
                            totalCreditsSent: { $sum: { $cond: [{ $eq: ['$_id.senderId', '$_id.senderId'] }, '$credits', 0] } },
                            totalCreditsReceived: { $sum: { $cond: [{ $eq: ['$_id.receiverId', '$_id.receiverId'] }, '$credits', 0] } },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            senderId: '$_id.senderId',
                            receiverId: '$_id.receiverId',
                            totalCreditsSent: 1,
                            totalCreditsReceived: 1,
                        },
                    },
                ]);
                //const totalCredits = transactions.length > 0 ? transactions[0].totalCredits : 0;
                return transactions;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new Report();
