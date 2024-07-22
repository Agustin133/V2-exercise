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
const user_services_1 = __importDefault(require("../services/user.services"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
class UserController {
    getUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_services_1.default.getUsers();
                res.status(200).json(users);
            }
            catch (err) {
                (0, errorHandler_1.default)(err, res);
            }
        });
    }
    getUserById(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = _req.params.id;
                const user = yield user_services_1.default.getUserById(userId);
                res.status(200).json(user);
            }
            catch (err) {
                (0, errorHandler_1.default)(err, res);
            }
        });
    }
    addCredits(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    id: _req.params.id,
                    creditos: _req.body.creditos
                };
                yield user_services_1.default.addCredits(payload);
                res.status(200).json({
                    message: 'Credits added successfully!'
                });
            }
            catch (err) {
                (0, errorHandler_1.default)(err, res);
            }
        });
    }
    transferCredits(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    id: _req.params.id,
                    id_2: _req.params.id_2,
                    creditos: _req.body.creditos,
                };
                yield user_services_1.default.transferCredits(payload);
                res.status(200).json({
                    message: 'Credits transferred successfully!',
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    (0, errorHandler_1.default)(err, res);
                }
                else {
                    console.error('Unknown error:', err);
                    res.status(500).json({
                        success: false,
                        message: 'An unknown error occurred',
                    });
                }
            }
        });
    }
}
exports.default = new UserController();
