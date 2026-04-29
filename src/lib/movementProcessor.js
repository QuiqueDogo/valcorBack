import mongoose from 'mongoose'
import Movement from '@/models/Movement'
import Stock from '@/models/Stock'

export async function processMovements() {
    const session = await mongoose.startSession()

    const movements = await Movement.find({ status: 'pending' }).limit(10)

    for (const m of movements) {
        const locked = await Movement.findOneAndUpdate(
            { _id: m._id, status: 'pending' },
            { status: 'processing' },
            { new: true }
        )

        if (!locked) continue

        try {
            await session.withTransaction(async () => {

                // OUT
                if (m.type === 'OUT') {
                    const updated = await Stock.findOneAndUpdate(
                        {
                            productId: m.productId,
                            branchId: m.fromBranchId,
                            quantity: { $gte: m.quantity }
                        },
                        { $inc: { quantity: -m.quantity } },
                        { session }
                    )

                    if (!updated) throw new Error('Stock insuficiente')
                }

                // IN
                if (m.type === 'IN') {
                    await Stock.findOneAndUpdate(
                        {
                            productId: m.productId,
                            branchId: m.toBranchId
                        },
                        { $inc: { quantity: m.quantity } },
                        { upsert: true, session }
                    )
                }

                // TRANSFER
                if (m.type === 'TRANSFER') {
                    const updated = await Stock.findOneAndUpdate(
                        {
                            productId: m.productId,
                            branchId: m.fromBranchId,
                            quantity: { $gte: m.quantity }
                        },
                        { $inc: { quantity: -m.quantity } },
                        { session }
                    )

                    if (!updated) throw new Error('Stock insuficiente')

                    await Stock.findOneAndUpdate(
                        {
                            productId: m.productId,
                            branchId: m.toBranchId
                        },
                        { $inc: { quantity: m.quantity } },
                        { upsert: true, session }
                    )
                }

                await Movement.findByIdAndUpdate(
                    m._id,
                    { status: 'processed' },
                    { session }
                )
            })

        } catch (error) {

            console.error('ERROR PROCESANDO MOVIMIENTO:', error)

            await Movement.findByIdAndUpdate(m._id, {
                $inc: { attempts: 1 },
                status: m.attempts + 1 >= 2 ? 'failed' : 'pending',
                error: error.message
            })
        }
    }

    session.endSession()
}