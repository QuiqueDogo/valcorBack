import Movement from '@/models/Movement'
import Stock from '@/models/Stock'
import { connectDB } from '@/lib/db'

export async function processMovements() {
    await connectDB()

    const movements = await Movement.find({ status: 'pending' }).limit(10)

    for (const m of movements) {
        try {
            // 🔹 OUT
            if (m.type === 'OUT') {
                const updated = await Stock.findOneAndUpdate(
                    {
                        productId: m.productId,
                        branchId: m.fromBranchId,
                        quantity: { $gte: m.quantity }
                    },
                    { $inc: { quantity: -m.quantity } }
                )

                if (!updated) throw new Error('Stock insuficiente')
            }

            // 🔹 IN
            if (m.type === 'IN') {
                await Stock.findOneAndUpdate(
                    {
                        productId: m.productId,
                        branchId: m.toBranchId
                    },
                    { $inc: { quantity: m.quantity } },
                    { upsert: true }
                )
            }

            // 🔹 TRANSFER
            if (m.type === 'TRANSFER') {
                const updated = await Stock.findOneAndUpdate(
                    {
                        productId: m.productId,
                        branchId: m.fromBranchId,
                        quantity: { $gte: m.quantity }
                    },
                    { $inc: { quantity: -m.quantity } }
                )

                if (!updated) throw new Error('Stock insuficiente')

                await Stock.findOneAndUpdate(
                    {
                        productId: m.productId,
                        branchId: m.toBranchId
                    },
                    { $inc: { quantity: m.quantity } },
                    { upsert: true }
                )
            }

            m.status = 'processed'
            await m.save()
        } catch (error) {
            m.attempts += 1

            if (m.attempts >= 2) {
                m.status = 'failed'
                m.error = error.message
            }

            await m.save()
        }
    }
}