import app from "./app.js";
import dotenv from "dotenv";
import connedDB from "./db/DB.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connedDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection failed", err);
  });
