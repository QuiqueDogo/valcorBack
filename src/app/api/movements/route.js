import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Movement from '@/models/Movement'

export async function GET() {
    await connectDB()

    const movements = await Movement.find()
        .populate('productId')
        .populate('fromBranchId')
        .populate('toBranchId')
        .sort({ createdAt: -1 })

    return NextResponse.json(movements)
}

export async function POST(req) {
    await connectDB()
    const body = await req.json()

    const { type, productId, quantity } = body

    if (!type || !productId || !quantity) {
        return NextResponse.json(
            { message: 'Datos incompletos' },
            { status: 400 }
        )
    }
    if (type === 'IN' && !body.toBranchId) {
        return NextResponse.json({ message: 'Destino requerido' }, { status: 400 })
    }

    if (type === 'OUT' && !body.fromBranchId) {
        return NextResponse.json({ message: 'Origen requerido' }, { status: 400 })
    }

    if (type === 'TRANSFER' && (!body.fromBranchId || !body.toBranchId)) {
        return NextResponse.json({ message: 'Origen y destino requeridos' }, { status: 400 })
    }
    const movement = await Movement.create({
        ...body,
        status: 'pending',
        attempts: 0
    })

    return NextResponse.json(movement, { status: 201 })
}