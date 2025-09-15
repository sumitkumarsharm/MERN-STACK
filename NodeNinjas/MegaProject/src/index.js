import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/db.connect.js"

dotenv.config({
    path : "./.env"
})


const PORT = process.env.PORT || 8080


connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.error("Error in Connecting MongoDB",err)
    process.exit(1)
})


