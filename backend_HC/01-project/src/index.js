import dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import { DB_NAME } from "./constants.js";
import mongoose from "mongoose";
import express from "express";
import connectDB from './db/db.js';
const app = express()


connectDB()


/*

;(async()=>{    // that semi-coloon in the start of the line is not a typo , it is for cleaning purpose (i.e) incase u missed a semicolon in the previous line

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR:",error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.error("ERROR: ",error)
        throw error
    }
})()       


*/