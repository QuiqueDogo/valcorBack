import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'
import Stock from '@/models/Stock'

export async function GET() {
    await connectDB()

    const products = await Product.find()
    const stock = await Stock.find()
        .populate('branchId')

    const result = products.map(product => {
        const productStock = stock.filter(
            s => s.productId.toString() === product._id.toString()
        )

        const total = productStock.reduce(
            (acc, s) => acc + s.quantity,
            0
        )

        return {
            ...product.toObject(),
            totalStock: total,
            stockByBranch: productStock.map(s => ({
                branch: s.branchId?.name,
                quantity: s.quantity
            }))
        }
    })

    return NextResponse.json(result)
}