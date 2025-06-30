import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DB from "./utils/db.js";

// dotenv package ko use krke environment variable ko access kr skte hai
dotenv.config();

// yaha hamen app ko express ki sara method de diya
const app = express();
// to tell the app please encode the utl
app.use(express.urlencoded({ extended: true }));

// hame json bhi accept krna hoga to express ko bolna padta hai
app.use(express.json());

// basic itna to krna hi hoga
app.use(
  cors({
    origin: process.env.BASE_URL, // multipal origin allow krna hai to ham isko array me daal kr allow kr skte hai
    methods: ["GET", "POST", "DELETE", "OPTION"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const port = process.env.PORT || 8080; // common port : 3000, 8080, 8000, 4000, 5000,5173
// busy port : 80, 443, 22,

app.get("/", (req, res) => {
  res.send("Hello Chai aur code!!");
});

app.get("/about", (req, res) => {
  res.send("This is About page");
});

app.get("/contact", (req, res) => {
  res.send("This is contact page");
});

// connect the db
DB();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
