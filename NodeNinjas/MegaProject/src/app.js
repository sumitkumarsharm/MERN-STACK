import express from "express"
const app = express()
// router import
import helthCheckRouter from "./routes/helthcheck.routes.js"


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/v1/helthcheck',helthCheckRouter)

export default app