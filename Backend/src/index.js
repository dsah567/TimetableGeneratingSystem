import { DB_NAME } from "./constants.js";
import mongoose from "mongoose";
process.loadEnvFile();

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("success");
    }
    catch(err){
        console.error("Error: ",err);
    }
})();