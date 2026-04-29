'use client'

import { useEffect, useState } from 'react'
import ReportTable from '@/components/reports/ReportTable'
import ReportChart from '@/components/reports/ReportChart'
import { DatePicker, Button, Tabs, Badge, Spin, Flex } from 'antd'
import { apiFetch } from '@/lib/api'

const { RangePicker } = DatePicker

export default function ReportsPage() {
    const [data, setData] = useState([])
    const [range, setRange] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)

            let url = '/api/reports?status=processed'

            if (range?.length === 2) {
                const from = range[0].toISOString()
                const to = range[1].toISOString()

                url += `&from=${from}&to=${to}`
            }

            const json = await apiFetch(url)

            setData(json)
        } catch (error) {
            console.error('Error cargando reporte:', error)
        } finally {
            setLoading(false)
        }
    }

    // 🔥 auto fetch cuando cambian fechas
    useEffect(() => {
        fetchData()
    }, [range])

    // 🔥 separar por tipo
    const inData = data.filter(d => d.type === 'IN')
    const outData = data.filter(d => d.type === 'OUT')
    const transferData = data.filter(d => d.type === 'TRANSFER')

    const total = (arr) => arr.reduce((acc, i) => acc + i.total, 0)

    // 🔥 transformar para gráfica
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
        <Flex vertical gap="middle">
            {/* 🔹 filtros */}
            <Flex gap="small" wrap="wrap">
                <RangePicker onChange={(dates) => setRange(dates)} style={{ flex: 1, minWidth: 280 }} />

                <Button type="primary" onClick={fetchData}>
                    Generar reporte
                </Button>
            </Flex>

            {/* 🔹 contenido */}
            <Spin spinning={loading}>
                <Tabs
                    items={[
                        {
                            key: 'IN',
                            label: (
                                <span>
                                    Entradas{' '}
                                    <Badge
                                        overflowCount={999}
                                        showZero
                                        count={total(inData)}
                                    />
                                </span>
                            ),
                            children: (
                                <Flex vertical gap="large">
                                    <ReportTable data={inData} />
                                    <ReportChart data={chartData} />
                                </Flex>
                            )
                        },
                        {
                            key: 'OUT',
                            label: (
                                <span>
                                    Salidas{' '}
                                    <Badge
                                        overflowCount={999}
                                        showZero
                                        count={total(outData)}
                                    />
                                </span>
                            ),
                            children: (
                                <Flex vertical gap="large">
                                    <ReportTable data={outData} />
                                    <ReportChart data={chartData} />
                                </Flex>
                            )
                        },
                        {
                            key: 'TRANSFER',
                            label: (
                                <span>
                                    Transferencias{' '}
                                    <Badge
                                        overflowCount={999}
                                        showZero
                                        count={total(transferData)}
                                    />
                                </span>
                            ),
                            children: (
                                <Flex vertical gap="large">
                                    <ReportTable data={transferData} />
                                    <ReportChart data={chartData} />
                                </Flex>
                            )
                        }
                    ]}
                />
            </Spin>
        </Flex>
    )
}