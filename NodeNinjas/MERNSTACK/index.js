import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express()
const port = process.env.PORT || 4000




dotenv.config()
app.use(express.json()) // Body parser middleware
app.use(express.urlencoded({ extended: true })) // URL-encoded parser middleware

app.use(cookieParser())

app.use(cors({
    origin: process.env.BASE_URL, // AGR Multiple origins allow krna chahte hai toh isme array de sakte hai
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))




// calling Database
db();

// User routes
app.use('/api/users', userRoutes);

// listing the server or start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
