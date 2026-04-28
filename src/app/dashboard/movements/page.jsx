'use client'

import { useEffect, useState } from 'react'
import MovementTable from '@/components/movements/MovementTable'
import MovementFilter from '@/components/movements/MovementFilter'
import ProcessWorkerButton from '@/components/shared/ProcessWorkerButton'
import { Button, message } from 'antd'
import MovementModal from '@/components/movements/MovementModal'

export default function MovementsPage() {


    const handleCreate = async (values) => {
        await fetch('/api/movements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(async (res) => {
            const data = await res.json()
            if (!res.ok) {
                message.error(data.message)
            } else {
                message.success(data.message)
            }
        }).catch((error) => {
            console.error(error)
        })

        setOpen(false)
        fetchData()
    }
    const [data, setData] = useState([])
    const [status, setStatus] = useState()
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const res = await fetch('/api/movements')
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filtered = status
        ? data.filter(m => m.status === status)
        : data

    return (
        <>

            <Button type="primary" onClick={() => setOpen(true)}>
                Nuevo movimiento
            </Button>
            <ProcessWorkerButton onDone={fetchData} />
            <MovementFilter onChange={setStatus} />
            <MovementTable data={filtered} />
            <MovementModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </>
    )
}