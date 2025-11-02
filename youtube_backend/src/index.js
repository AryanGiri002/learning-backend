// require('dotenv').config({path:'./.env'}) // this breaks the code consistency coz we using require as well as import, to counter this we will use import for dotenv, as well but as we know that import's nature is asynchronous , but we need to make sure that .env is the first file which is loaded even before our application runs, for that we would have to make changes in our package.json script
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
import connectDB from './db/db.js';

connectDB(); // this is approach 2, having the connection logic to the db in a separate file and we are just running that fxn/logic in the index.js file

// // this is approach 1 where the connection logic to the DB is also wriiten in index.js
// import express from "express"
// const app = express()

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)

//         app.on('error', ()=>{
//             console.log(`ERROR(express ka kuch to error hai): ${error}`);
//             throw error
//         })

//         app.listen(process.env.PORT , ()=>{
//             console.log(`App is listening on PORT: ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error(`ERROR(index.js): ${error}`);
//         throw error;
//     }
// })();
