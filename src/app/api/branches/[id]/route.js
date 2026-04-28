import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Branch from '@/models/Branch'

// GET
export async function GET(req, { params }) {
    await connectDB()
    const branch = await Branch.findById(params.id)

    if (!branch) {
        return NextResponse.json(
            { message: 'No encontrado' },
            { status: 404 }
        )
    }

    return NextResponse.json(branch)
}

// PUT
export async function PUT(req, { params }) {
    await connectDB()
    const body = await req.json()

    const branch = await Branch.findByIdAndUpdate(
        params.id,
        body,
        { new: true }
    )

    return NextResponse.json(branch)
}

// DELETE
export async function DELETE(req, { params }) {
    await connectDB()

    await Branch.findByIdAndDelete(params.id)

    return NextResponse.json({ message: 'Eliminado' })
}