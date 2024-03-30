import mongoose from "mongoose";

export const connect = async () => {
    try {
        if(!process.env.MONGO_URL){
            throw new Error('Mongodb connection url is required');
        }
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/mini_project?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`🍃 Database Established connection with MongoDB`);
        console.log(`@-${conn.connection.host}`)
    } catch (error: any) {
        console.error(`❌ Database Connection failed`);
        console.error(error.message);
        process.exit(1);
    }
}