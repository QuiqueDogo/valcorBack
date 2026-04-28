import mongoose from 'mongoose'

const branchSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String }
    },
    { timestamps: true }
)

export default mongoose.models.Branch ||
    mongoose.model('Branch', branchSchema)