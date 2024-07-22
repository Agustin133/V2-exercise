import dotenv from 'dotenv';

const envFound = dotenv.config();

if(envFound.error){
    throw new Error('Could not find .env files');
}

export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI
}