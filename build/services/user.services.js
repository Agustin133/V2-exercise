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
const csvModel_1 = __importDefault(require("../models/csvModel"));
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
class User {
    validateCredits(credits) {
        if (typeof credits !== 'number') {
            throw new Error('Credits must be a number');
        }
        if (credits <= 0) {
            throw new Error(`Credits must be more than '0'`);
        }
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield csvModel_1.default.findOne({ id }).exec();
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield csvModel_1.default.find().exec();
                if (!users) {
                    throw new Error('There are users in the database');
                }
                return users;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.getUser(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    addCredits(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredits(payload.creditos);
                const user = yield csvModel_1.default.findOne({ id: payload.id }).exec();
                if (!user) {
                    throw new Error('User not found');
                }
                // add credit to the actual user credits
                user.creditos += payload.creditos;
                // save changes into the db
                const updatedUser = yield user.save();
                return updatedUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    ;
    // async transferCredits(payload: { id: string, id_2: string, creditos: number }) {
    //     this.validateCredits(payload.creditos);
    //     const user_1 = await this.getUser(payload.id);
    //     const user_2 = await this.getUser(payload.id_2);
    //     if (!user_1) {
    //         throw new Error(`User with id ${payload.id} does not exist.`);
    //     }
    //     if (!user_2) {
    //         throw new Error(`User with id ${payload.id_2} does not exist.`);
    //     }
    //     if (user_1.creditos < payload.creditos) {
    //         throw new Error(`User with id ${payload.id} does not have enough credits. Available credits: ${user_1.creditos}`);
    //     }
    //     user_1.creditos -= payload.creditos;
    //     user_2.creditos += payload.creditos;
    //     await user_1.save();
    //     await user_2.save();
    //     return { success: true, message: 'Credits transferred successfully.' };
    // }
    transferCredits(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validateCredits(payload.creditos);
                const user_1 = yield this.getUser(payload.id);
                const user_2 = yield this.getUser(payload.id_2);
                if (!user_1) {
                    throw new Error(`User with id ${payload.id} does not exist.`);
                }
                if (!user_2) {
                    throw new Error(`User with id ${payload.id_2} does not exist.`);
                }
                if (user_1.creditos < payload.creditos) {
                    throw new Error(`User with id ${payload.id} does not have enough credits. Available credits: ${user_1.creditos}`);
                }
                user_1.creditos -= payload.creditos;
                user_2.creditos += payload.creditos;
                yield user_1.save();
                yield user_2.save();
                // Record the transaction
                const transaction = new transactionModel_1.default({
                    senderId: payload.id,
                    receiverId: payload.id_2,
                    credits: payload.creditos,
                });
                yield transaction.save();
                return { success: true, message: 'Credits transferred successfully.' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = new User();
