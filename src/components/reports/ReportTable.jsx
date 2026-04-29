import { Table } from 'antd'

export default function ReportTable({ data }) {
    return (
        <Table
            title={() => 'Reporte'}
            dataSource={data}
            rowKey={(record) => `${record.type}-${record.branch}`}
            scroll={{ x: 'max-content' }}
            columns={[
                {
                    title: 'Tipo',
                    render: (row) => row.type
                },
                {
                    title: 'Sucursal',
                    render: (row) => row.branch || 'N/A'
                },
                {
                    title: 'Total',
                    dataIndex: 'total'
                }
            ]}
        />
    )
}