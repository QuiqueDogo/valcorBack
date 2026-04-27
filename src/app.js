import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'

const app = express()

app.use(cors({
    origin: process.env.FRONT_URL
}))

app.use(express.json())

// health check
app.get('/api/health', (req, res) => {
    res.json({ ok: true })
})

app.use('/api/products', productRoutes)



export default app