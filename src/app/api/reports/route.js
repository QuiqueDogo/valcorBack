import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Movement from '@/models/Movement'

export async function GET(req) {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')

    const match = {}

    if (from && to) {
        match.createdAt = {
            $gte: new Date(from),
            $lte: new Date(to)
        }
    }

    const report = await Movement.aggregate([
        { $match: match },
        {
            $group: {
                _id: {
                    type: '$type',
                    branch: '$fromBranchId'
                },
                total: { $sum: '$quantity' }
            }
        }
    ])

    return NextResponse.json(report)
}