'use client'

import { useEffect, useState } from 'react'
import { Button } from 'antd'
import ProductTable from '@/components/products/ProductTable'
import ProductModal from '@/components/products/ProductModal'

export default function ProductsPage() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const res = await fetch('/api/products/with-stock')
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = async (values) => {
        await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })

        setOpen(false)
        fetchData()
    }

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Nuevo producto
            </Button>

            <ProductTable data={data} />

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </>
    )
}