import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(req) {
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    if (pathname.startsWith('/api')) {
        const authHeader =
            req.headers.get('authorization') ||
            req.headers.get('Authorization')

        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : null

        console.log('AUTH HEADER:', authHeader)
        console.log('TOKEN:', token)

        if (!token) {
            return NextResponse.json(
                { message: 'No autorizado' },
                { status: 401 }
            )
        }

        let valid = null

        try {
            valid = verifyToken(token)
        } catch (e) {
            console.error('VERIFY FAIL:', e.message)
        }
        console.log('SECRET:', process.env.JWT_SECRET)

        if (!valid) {
            return NextResponse.json(
                { message: 'Token inválido' },
                { status: 401 }
            )
        }

    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/api/:path*'],
    runtime: 'nodejs'
}