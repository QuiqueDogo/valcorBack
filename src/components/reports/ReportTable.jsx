import { Table } from 'antd'

export default function ReportTable({ data }) {
    return (
        <Table
            title={() => 'Reporte'}
            dataSource={data}
            rowKey={(row, i) => i}
            columns={[
                {
                    title: 'Tipo',
                    render: (row) => row._id.type
                },
                {
                    title: 'Sucursal',
                    render: (row) => row._id.branch || 'N/A'
                },
                {
                    title: 'Total',
                    dataIndex: 'total'
                }
            ]}
        />
    )
}