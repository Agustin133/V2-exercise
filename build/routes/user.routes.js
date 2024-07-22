"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const passport_1 = __importDefault(require("passport"));
const authenticate = passport_1.default.authenticate('jwt', { session: false });
const router = (0, express_1.Router)();
router.get('/', authenticate, user_controller_1.default.getUsers);
router.get('/:id', authenticate, user_controller_1.default.getUserById);
router.post('/:id', authenticate, user_controller_1.default.addCredits);
router.post('/transfer/:id/:id_2', authenticate, user_controller_1.default.transferCredits);
exports.default = router;
