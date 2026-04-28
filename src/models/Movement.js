import mongoose from 'mongoose'

const movementSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['IN', 'OUT', 'TRANSFER'],
            required: true
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        fromBranchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        toBranchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        status: {
            type: String,
            enum: ['pending', 'processed', 'failed'],
            default: 'pending'
        },
        attempts: {
            type: Number,
            default: 0
        },
        error: {
            type: String
        }
    },
    { timestamps: true }
)

export default mongoose.models.Movement ||
    mongoose.model('Movement', movementSchema)
