import mongoose, { connection } from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        
        connection.on('connected', ()=>{
            console.log('MongoDB connected succesfully')
        })
        connection.on('error', (err)=>{
            console.log('mongoDB connection error'+ err);
            process.exit();
        })
        
    }
    catch(error) {
        console.log('Something goes wrong');
        console.log(error);
    }
    
}