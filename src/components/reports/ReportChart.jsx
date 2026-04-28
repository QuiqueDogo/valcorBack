'use client'

import { ResponsiveBar } from '@nivo/bar'

export default function ReportChart({ data }) {
    return (
        <div style={{ height: 400 }}>
            <ResponsiveBar
                data={data}
                keys={['IN', 'OUT', 'TRANSFER']}
                indexBy="branch"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                axisBottom={{
                    legend: 'Sucursal',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    legend: 'Cantidad',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
            />
        </div>
    )
}