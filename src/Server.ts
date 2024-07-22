import express, { Application } from 'express';
import cors from 'cors'
import config from './config/config';
import routerFile from './routes/file.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import reportRoute from './routes/report.routes'
import connectDB from './config/mongo';
import passport from 'passport';
import passportMiddelware from './middlewares/passport.middelware';


class Server {

    private app: Application;
    private port: string;
    private path = {
        upload: '/upload',
        auth: '/auth',
        user: '/user',
        report: '/report'
    }

    constructor(){
        this.app = express();
        this.port = config.port as string;
        this.connectDatabase();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async connectDatabase(){
        try{
            await connectDB;
        }catch(err){
            console.error(`Database connection failed ${err}`)
            process.exit(1);
        }
    }


    middlewares(){
        this.app.use(express.json());
        this.app.use(
            cors({
                origin: '*',
                methods: 'GET, POST, PUT, PATCH, DELETE'
            })
        )
        this.app.use(passport.initialize());
        passport.use(passportMiddelware);
    }

    routes(){
        this.app.use(this.path.upload, routerFile);
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.user, userRoutes);
        this.app.use(this.path.report, reportRoute)
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server running on port ${this.port}`)
        })
    }
}

export default Server;
