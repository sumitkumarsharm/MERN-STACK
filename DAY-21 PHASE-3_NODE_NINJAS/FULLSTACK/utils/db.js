import mongoose from "mongoose";

// somtimes we need to load third party library then we use this
import dotenv from "dotenv";
dotenv.config();

// export a function that conntcts to the DB
const DB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB connection error", err);
    });
};

export default DB;
