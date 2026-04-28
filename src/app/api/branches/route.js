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
    try {
        await connectDB()
        const body = await req.json()

        const { name, location } = body

        if (!name) {
            return NextResponse.json(
                { message: 'Nombre requerido' },
                { status: 400 }
            )
        }

        const normalizedName = name.trim().toLowerCase()

        const exists = await Branch.findOne({
            name: { $regex: new RegExp(`^${normalizedName}$`, 'i') }
        })

        if (exists) {
            return NextResponse.json(
                { message: 'La sucursal ya existe' },
                { status: 400 }
            )
        }

        const branch = await Branch.create({
            name: name.trim(),
            location
        })

        return NextResponse.json(branch, { status: 201 })

    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}