import Product from '../models/Products.js'

// Crear producto
export const createProduct = async (req, res) => {
    try {
        const { sku, name, price, category } = req.body

        if (!sku || !name || price == null) {
            return res.status(400).json({ message: 'Datos incompletos' })
        }

        const exists = await Product.findOne({ sku })
        if (exists) {
            return res.status(400).json({ message: 'SKU ya existe' })
        }

        const product = await Product.create({ sku, name, price, category })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener todos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener uno
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Actualizar
export const updateProduct = async (req, res) => {
    try {
        if (req.body.sku) {
            delete req.body.sku
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )


        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Eliminar
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' })
        }

        res.json({ message: 'Producto eliminado' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}