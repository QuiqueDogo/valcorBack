import mongoose from 'mongoose'

const stockSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    branchId: {
        type: mongoose.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

stockSchema.index({ productId: 1, branchId: 1 }, { unique: true })

export default mongoose.model('Stock', stockSchema)