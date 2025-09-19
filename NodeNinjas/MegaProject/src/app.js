import express from "express"
const app = express()
// router import
import helthCheckRouter from "./routes/helthcheck.routes.js"
import userRoutes from "./routes/auth.routes.js"


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/v1/helthcheck',helthCheckRouter)
app.use('/api/v1/user',userRoutes)

export default app