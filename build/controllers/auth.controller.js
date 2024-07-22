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
exports.signIn = exports.signUp = void 0;
const auth_services_1 = __importDefault(require("../services/auth.services"));
const signUp = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!_req.body.email || !_req.body.password) {
            return res.status(400).json({ message: 'Please send your email and password' });
        }
        const user = yield auth_services_1.default.signUp(_req.body);
        res.status(201).json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === 'User already exists') {
                res.status(409).json({ error: err.message });
            }
            else {
                res.status(500).json({ error: err.message });
            }
        }
        else {
            console.error('Unknown error occurred:', err);
        }
    }
});
exports.signUp = signUp;
const signIn = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!_req.body.email || !_req.body.password) {
            return res.status(400).json({ message: 'Please send your email and password' });
        }
        const token = yield auth_services_1.default.signIn(_req.body);
        if (token) {
            res.status(200).json({ token });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === 'Unauthorized') {
                res.status(401).json({ error: err.message }); // 401 Unauthorized
            }
            else {
                res.status(500).json({ error: err.message });
            }
        }
        else {
            console.error('Unknown error occurred:', err);
        }
    }
});
exports.signIn = signIn;
