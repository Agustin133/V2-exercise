"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error('Could not find .env files');
}
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI
};
