import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'
import branchRoutes from './routes/branch.routes.js'
import stockRoutes from './routes/stock.routes.js'
a
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
app.use('/api/branches', branchRoutes)
app.use('/api/stock', stockRoutes)



export default app