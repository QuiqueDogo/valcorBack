import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Stock from '@/models/Stock'

export async function GET(req) {
    await connectDB()

    const { searchParams } = new URL(req.url)

    const productId = searchParams.get('productId')
    const branchId = searchParams.get('branchId')

    if (!productId || !branchId) {
        return NextResponse.json({ quantity: 0 })
    }

    const stock = await Stock.findOne({
        productId,
        branchId
    })

    return NextResponse.json({
        quantity: stock?.quantity || 0
    })
}