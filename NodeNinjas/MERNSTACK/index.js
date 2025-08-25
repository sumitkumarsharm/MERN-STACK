import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import db from "./utils/db.js"


dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors({
    origin: process.env.BASE_URL, // AGR Multiple origins allow krna chahte hai toh isme array de sakte hai
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json()) // Body parser middleware
app.use(express.urlencoded({ extended: true })) // URL-encoded parser middleware

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// calling Database
db();


// listing the server or start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
