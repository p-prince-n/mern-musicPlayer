import mongoose from 'mongoose'

export const connectDB=async()=>{
    
    try{
        const conn=await mongoose.connect(process.env.DB_URL);
        console.log(`connetced to MongoDB ${conn.connection.host}`);
        

    }catch(e){
        console.log(e.message);
        process.exit(1);
        
    }
}