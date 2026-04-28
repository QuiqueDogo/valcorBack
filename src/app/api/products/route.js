import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/models/Products'

// GET - obtener todos
export async function GET() {
    await connectDB()
    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products)
}

// POST - crear producto
export async function POST(req) {
    try {
        await connectDB()
        const body = await req.json()

        const { sku, name, price } = body

        if (!sku || !name || price == null) {
            return NextResponse.json(
                { message: 'Datos incompletos' },
                { status: 400 }
            )
        }

        const exists = await Product.findOne({ sku })
        if (exists) {
            return NextResponse.json(
                { message: 'SKU ya existe' },
                { status: 400 }
            )
        }

        const product = await Product.create(body)

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}