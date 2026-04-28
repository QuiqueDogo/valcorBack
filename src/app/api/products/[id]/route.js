import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Product from '@/models/Product'

// GET
export async function GET(req, { params }) {
    await connectDB()

    const product = await Product.findById(params.id)

    if (!product) {
        return NextResponse.json(
            { message: 'No encontrado' },
            { status: 404 }
        )
    }

    return NextResponse.json(product)
}

// PUT
export async function PUT(req, { params }) {
    await connectDB()
    const body = await req.json()

    delete body.sku

    const product = await Product.findByIdAndUpdate(
        params.id,
        body,
        { new: true }
    )

    return NextResponse.json(product)
}

// DELETE
export async function DELETE(req, { params }) {
    await connectDB()

    await Product.findByIdAndDelete(params.id)

    return NextResponse.json({ message: 'Eliminado' })
}