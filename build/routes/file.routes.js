"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controllers_1 = __importDefault(require("../controllers/file.controllers"));
const file_middleware_1 = require("../middlewares/file.middleware");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post('/', passport_1.default.authenticate('jwt', { session: false }), file_middleware_1.handleFileUpload, file_controllers_1.default.uploadFile);
exports.default = router;
