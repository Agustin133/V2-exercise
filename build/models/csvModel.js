"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserDataSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    id: {
        type: String,
        required: true,
    },
    creditos: {
        type: Number,
        required: true,
        default: 0, // Default value for creditos
    },
}, { collection: 'Users' });
exports.default = (0, mongoose_1.model)('User', UserDataSchema);
