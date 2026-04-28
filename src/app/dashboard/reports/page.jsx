'use client'

import { useEffect, useState } from 'react'
import ReportTable from '@/components/reports/ReportTable'

export default function ReportsPage() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await fetch('/api/reports')
        const json = await res.json()
        setData(json)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <ReportTable data={data} />
}