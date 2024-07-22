import mongoose from 'mongoose';
import config from './config';

const connectDB = async (mongo_uri: string) => {
    try {
        await mongoose.connect(mongo_uri);
        console.log('Connected to MongoDB database');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

const mongoUri = config.mongo_uri;

if (!mongoUri) {
    throw new Error('MongoDB URI is not defined');
}

export default connectDB(mongoUri);
