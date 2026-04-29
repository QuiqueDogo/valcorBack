import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Movement from '@/models/Movement'

export async function GET(req) {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const status = searchParams.get('status')

    const match = {
        status: status || 'processed'
    }

    if (from && to) {
        match.createdAt = {
            $gte: new Date(from),
            $lte: new Date(to)
        }
    }

    const report = await Movement.aggregate([
        { $match: match },

        {
            $addFields: {
                createdAt: {
                    $dateToString: {
                        format: "%Y-%m-%d %H:%M:%S",
                        date: "$createdAt"
                    }
                },
                idUnique: "$_id",
                branch: {
                    $cond: [
                        { $eq: ['$type', 'IN'] },
                        '$toBranchId',
                        '$fromBranchId'
                    ]
                }
            }
        },

        {
            $group: {
                _id: {
                    type: '$type',
                    branch: '$branch',
                    date: '$createdAt',
                    idUnique: '$idUnique',
                },
                total: { $sum: '$quantity' },
            }
        },

        {
            $lookup: {
                from: 'branches',
                localField: '_id.branch',
                foreignField: '_id',
                as: 'branch'
            }
        },

        {
            $unwind: {
                path: '$branch',
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $project: {
                _id: 0,
                type: '$_id.type',
                branch: '$branch.name',
                date: '$_id.date',
                idUnique: '$_id.idUnique',
                total: 1
            }
        }
    ])

    return NextResponse.json(report)
}