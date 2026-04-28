import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Branch from '@/models/Branch'

// GET
export async function GET() {
    await connectDB()
    const branches = await Branch.find().sort({ createdAt: -1 })
    return NextResponse.json(branches)
}

// POST
export async function POST(req) {
    await connectDB()
    const body = await req.json()

    if (!body.name) {
        return NextResponse.json(
            { message: 'Nombre requerido' },
            { status: 400 }
        )
    }

    const branch = await Branch.create(body)
    return NextResponse.json(branch, { status: 201 })
}