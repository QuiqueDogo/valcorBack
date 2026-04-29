'use client'

import { useEffect, useState } from 'react'
import { Button, message, Flex } from 'antd'
import BranchTable from '@/components/branches/BranchTable'
import BranchModal from '@/components/branches/BranchModal'
import { apiFetch } from '@/lib/api'

export default function BranchesPage() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const json = await apiFetch('/api/branches')
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = async (values) => {
        try {
            const data = await apiFetch('/api/branches', {
                method: 'POST',
                body: JSON.stringify(values)
            })

            if (data) {
                message.success("Sucursal creada exitosamente")
            }
        } catch (error) {
            console.error(error)
            message.error('Error al crear la sucursal')
        }

        setOpen(false)
        fetchData()
    }

    return (
        <Flex vertical gap="middle">
            <Flex justify="flex-start">
                <Button type="primary" onClick={() => setOpen(true)}>
                    Nueva sucursal
                </Button>
            </Flex>

            <BranchTable data={data} />

            <BranchModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </Flex>
    )
}