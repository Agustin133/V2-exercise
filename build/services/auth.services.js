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
const authModel_1 = __importDefault(require("../models/authModel"));
const helpers_1 = __importDefault(require("../utils/helpers"));
class AuthService {
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authModel_1.default.findOne({ email: payload.email });
                if (user) {
                    throw new Error('User already exists');
                }
                const newUser = new authModel_1.default(payload);
                yield newUser.save();
                return newUser;
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
    ;
    signIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield authModel_1.default.findOne({ email: payload.email });
                if (!user) {
                    throw new Error('Unauthorized');
                }
                const isMatch = yield user.comparePassword(payload.password);
                if (isMatch) {
                    return helpers_1.default.createToken(user);
                }
                else {
                    throw new Error('Unauthorized');
                }
            }
            catch (err) {
                throw err;
            }
            ;
        });
    }
    ;
}
exports.default = new AuthService();
