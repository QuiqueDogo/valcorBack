'use client'

import { useEffect, useState } from 'react'
import ReportTable from '@/components/reports/ReportTable'
import { DatePicker, Button, Tabs, Badge } from 'antd'
const { RangePicker } = DatePicker
import ReportChart from '@/components/reports/ReportChart'

export default function ReportsPage() {
    const [data, setData] = useState([])
    const [range, setRange] = useState([])

    const inData = data.filter(d => d.type === 'IN')
    const outData = data.filter(d => d.type === 'OUT')
    const transferData = data.filter(d => d.type === 'TRANSFER')

    const fetchData = async () => {
        let url = '/api/reports'

        if (range.length === 2) {
            const from = range[0].toISOString()
            const to = range[1].toISOString()

            url += `?from=${from}&to=${to}`
        }

        const res = await fetch(url)
        const json = await res.json()
        setData(json)
    }
    const total = (arr) => arr.reduce((acc, i) => acc + i.total, 0)

    useEffect(() => {
        fetchData()
    }, [])

    const transformData = (data) => {
        const map = {}

        data.forEach(item => {
            if (!map[item.branch]) {
                map[item.branch] = {
                    branch: item.branch,
                    IN: 0,
                    OUT: 0,
                    TRANSFER: 0
                }
            }

            map[item.branch][item.type] = item.total
        })

        return Object.values(map)
    }

    const chartData = transformData(data)
    return (
        <>
            <RangePicker onChange={(dates) => setRange(dates)} />
            <Button onClick={fetchData}>Actualizar reporte</Button>

            <Tabs
                items={[
                    {
                        key: 'IN',
                        label: (
                            <span>
                                Entradas <Badge overflowCount={999} showZero count={total(inData)} />
                            </span>
                        ),
                        children: <>
                            <ReportTable data={inData} />
                            <ReportChart data={chartData} />
                        </>
                    },
                    {
                        key: 'OUT',
                        label: (
                            <span>
                                Salidas <Badge overflowCount={999} showZero count={total(outData)} />
                            </span>
                        ),
                        children: <>
                            <ReportTable data={outData} />
                            <ReportChart data={chartData} />
                        </>
                    },
                    {
                        key: 'TRANSFER',
                        label: (
                            <span>
                                Transferencias <Badge overflowCount={999} showZero count={total(transferData)} />
                            </span>
                        ),
                        children: <><ReportTable data={transferData} />
                            <ReportChart data={chartData} /></>
                    }
                ]}
            />
        </>
    )
}