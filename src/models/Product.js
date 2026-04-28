import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        sku: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String }
    },
    { timestamps: true }
)

export default mongoose.models.Product ||
    mongoose.model('Product', productSchema)