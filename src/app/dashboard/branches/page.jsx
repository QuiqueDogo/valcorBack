'use client'

import { useEffect, useState } from 'react'
import { Button, message } from 'antd'
import BranchTable from '@/components/branches/BranchTable'
import BranchModal from '@/components/branches/BranchModal'

export default function BranchesPage() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    const fetchData = async () => {
        const res = await fetch('/api/branches')
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreate = async (values) => {
        await fetch('/api/branches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                Nueva sucursal
            </Button>

            <BranchTable data={data} />

            <BranchModal
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={handleCreate}
            />
        </>
    )
}