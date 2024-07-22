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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const mongo_1 = __importDefault(require("./config/mongo"));
const passport_1 = __importDefault(require("passport"));
const passport_middelware_1 = __importDefault(require("./middlewares/passport.middelware"));
class Server {
    constructor() {
        this.path = {
            upload: '/upload',
            auth: '/auth',
            user: '/user',
            report: '/report'
        };
        this.app = (0, express_1.default)();
        this.port = config_1.default.port;
        this.connectDatabase();
        this.middlewares();
        this.routes();
        this.listen();
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongo_1.default;
            }
            catch (err) {
                console.error(`Database connection failed ${err}`);
                process.exit(1);
            }
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: '*',
            methods: 'GET, POST, PUT, PATCH, DELETE'
        }));
        this.app.use(passport_1.default.initialize());
        passport_1.default.use(passport_middelware_1.default);
    }
    routes() {
        this.app.use(this.path.upload, file_routes_1.default);
        this.app.use(this.path.auth, auth_routes_1.default);
        this.app.use(this.path.user, user_routes_1.default);
        this.app.use(this.path.report, report_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
