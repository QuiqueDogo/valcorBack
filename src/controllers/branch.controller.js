import Branch from '../models/Branch.js'

// Crear
export const createBranch = async (req, res) => {
    try {
        const { name, location } = req.body

        if (!name) {
            return res.status(400).json({ message: 'Nombre requerido' })
        }

        const branch = await Branch.create({ name, location })
        res.status(201).json(branch)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener todas
export const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find().sort({ createdAt: -1 })
        res.json(branches)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Obtener una
export const getBranchById = async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id)

        if (!branch) {
            return res.status(404).json({ message: 'Sucursal no encontrada' })
        }

        res.json(branch)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Actualizar
export const updateBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!branch) {
            return res.status(404).json({ message: 'Sucursal no encontrada' })
        }

        res.json(branch)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Eliminar
export const deleteBranch = async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id)

        if (!branch) {
            return res.status(404).json({ message: 'Sucursal no encontrada' })
        }

        res.json({ message: 'Sucursal eliminada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}