import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const url=process.env.DB_URL;

export const connectusingMongoose=async()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("database is connected");
    }catch(err){
        console.log(err);

    }
}