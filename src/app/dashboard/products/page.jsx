'use client'

import { useEffect, useState } from 'react'
import { Button, message, Flex } from 'antd'
import ProductTable from '@/components/products/ProductTable'
import ProductModal from '@/components/products/ProductModal'
import { apiFetch } from '@/lib/api'

export default function ProductsPage() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        try {
            const json = await apiFetch('/api/products/with-stock')
            setData(json)
        } catch (err) {
            console.log(err)
            message.error('Error al cargar los productos')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = async (values) => {
        await apiFetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(values)
        })

        setOpen(false)
        fetchData()
    }

    return (
        <Flex vertical gap="middle">
            <Flex justify="flex-start">
                <Button type="primary" onClick={() => setOpen(true)}>
                    Nuevo producto
                </Button>
            </Flex>

            <ProductTable data={data} />

            <ProductModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </Flex>
    )
}