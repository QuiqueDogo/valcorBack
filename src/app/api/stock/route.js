import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Stock from '@/models/Stock'

export async function GET() {
    await connectDB()

    const stock = await Stock.find()
        .populate('productId')
        .populate('branchId')

    return NextResponse.json(stock)
}