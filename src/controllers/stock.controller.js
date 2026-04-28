import Stock from '../models/Stock.js'

export const getStock = async (req, res) => {
    try {
        const { productId, branchId } = req.query

        const filter = {}
        if (productId) filter.productId = productId
        if (branchId) filter.branchId = branchId

        const stock = await Stock.find(filter)
            .populate('productId')
            .populate('branchId')

        res.json(stock)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}