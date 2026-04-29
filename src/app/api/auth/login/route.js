import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

const USER = {
    email: 'admin@test.com',
    password: '123456'
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Datos incompletos' },
                { status: 400 }
            )
        }

        if (email !== USER.email || password !== USER.password) {
            return NextResponse.json(
                { message: 'Credenciales inválidas' },
                { status: 401 }
            )
        }

        const token = signToken({ email })

        return NextResponse.json({ token })

    } catch (error) {
        return NextResponse.json(
            { message: 'Error en login' },
            { status: 500 }
        )
    }
}