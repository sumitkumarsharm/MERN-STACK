import express from 'express'

const app = express()

// routes import
import helthCheckRoutes from './routes/helthcheck.routes.js'

app.use('/api/v1/helthcheck',helthCheckRoutes);

export default app;