import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/auth.route.js';



dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))



app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Hello from Backend"
    });
});


app.use("/api/v1/auth", userRouter);


app.listen(PORT, () => {
    console.log(`Backend is listening on port ${PORT}`);
});