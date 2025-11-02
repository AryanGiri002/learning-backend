import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
    console.log(`connectionInstance : ${connectionInstance}`);
    console.log(
      `connectionInstance.connection.host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB connection error(db.js) : ${error}`);
    process.exit(1);
  }
};

export default connectDB;
