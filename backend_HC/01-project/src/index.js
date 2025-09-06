// import dotenv from 'dotenv'
// dotenv.config({ path: './.env' })
//commented out the above 2 lines becuase of the updated "dev" script in package.json , which loads the .env file even before index.js is run
import express from "express";
import connectDB from './db/db.js';
import app from './app.js';


connectDB()
           .then(()=>{
                // 1. Set up the application-level error listener first.
                // This ensures that if the server crashes after starting,
                // we have a listener in place to catch it.
                app.on("error", (error) => {
                    console.log("SERVER ERROR:", error);
                    throw error; // Or handle it more gracefully
                });

                // 2. Now that the listener is ready, start the server.
                app.listen(process.env.PORT || 8000, () => {
                    console.log(`⚙ Server is running at port : ${process.env.PORT}`);
                });

           })
           .catch((err)=>{
                console.log("MONGO db connection failed !!! : ",err)
           })


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