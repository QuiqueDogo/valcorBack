import { Table } from 'antd'

export default function ReportTable({ data }) {
    return (
        <Table
            title={() => 'Reporte'}
            dataSource={data}
            rowKey='idUnique'
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
                    title: 'Fecha Creacion',
                    render: (row) => row.date
                },
                {
                    title: 'Total',
                    dataIndex: 'total'
                }
            ]}
        />
    )
}