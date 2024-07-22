"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const report_controller_1 = __importDefault(require("../controllers/report.controller"));
const router = (0, express_1.Router)();
router.get('/', passport_1.default.authenticate('jwt', { session: false }), report_controller_1.default.generateReport);
exports.default = router;
