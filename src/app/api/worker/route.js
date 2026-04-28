import { NextResponse } from 'next/server'
import { processMovements } from '@/lib/movementProcessor'

export async function GET() {
    await processMovements()
    return NextResponse.json({ ok: true })
}