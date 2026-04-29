'use client'

import { useEffect, useState } from 'react'
import MovementTable from '@/components/movements/MovementTable'
import MovementFilter from '@/components/movements/MovementFilter'
import ProcessWorkerButton from '@/components/shared/ProcessWorkerButton'
import { Button, message, Flex } from 'antd'
import MovementModal from '@/components/movements/MovementModal'
import { apiFetch } from '@/lib/api'

export default function MovementsPage() {


    const handleCreate = async (values) => {
        try {
            const data = await apiFetch('/api/movements', {
                method: 'POST',
                body: JSON.stringify(values)
            })

            if (data && data.message) {
                message.success(data.message)
            }
        } catch (error) {
            console.error(error)
            message.error('Error al crear el movimiento')
        }

        setOpen(false)
        fetchData()
    }
    const [data, setData] = useState([])
    const [status, setStatus] = useState()
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const json = await apiFetch('/api/movements')
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filtered = status
        ? data.filter(m => m.status === status)
        : data

    return (
        <Flex vertical gap="middle">
            <Flex gap="small" wrap="wrap" justify="space-between" align="center">
                <Flex gap="small" wrap="wrap">
                    <Button type="primary" onClick={() => setOpen(true)}>
                        Nuevo movimiento
                    </Button>
                    <ProcessWorkerButton onDone={fetchData} />
                </Flex>
                <MovementFilter onChange={setStatus} />
            </Flex>

            <MovementTable data={filtered} />
            <MovementModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </Flex>
    )
}