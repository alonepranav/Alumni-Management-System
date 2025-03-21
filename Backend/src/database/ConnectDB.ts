import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose"
import { APP_MONGODB_STRING } from "../constants";


const ConnectDB = async () => {

    try {
        const conn = await mongoose.connect(APP_MONGODB_STRING);

        if (conn) console.log("Connected");
        else throw new Error();

    } catch (error) {
        console.log("Error in connecting to DB");
    }

}


export default ConnectDB;