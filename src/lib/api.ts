export async function getProducts() {
    const res = await fetch('/api/products', {
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Error al obtener productos')
    }

    return res.json()
}

export async function createProduct(data: {
    sku: string
    name: string
    price: number
    category?: string
}) {
    const res = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return res.json()
}