import { Table, Tag } from 'antd'

export default function MovementTable({ data }) {
    return (
        <Table
            title={() => 'Movimientos'}
            dataSource={data}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
            columns={[
                { title: 'Tipo', dataIndex: 'type' },
                { title: 'Cantidad', dataIndex: 'quantity' },
                {
                    title: 'Estado',
                    render: (status) => {
                        const color =
                            status.status === 'processed'
                                ? 'green'
                                : status.status === 'failed'
                                    ? 'red'
                                    : 'orange'

                        return <Tag color={color}>{status.status}</Tag>
                    }
                },
                {
                    title: 'Error',
                    render: (row) => row.error
                },
                {
                    title: 'Producto',
                    render: (row) => row.productId?.name
                }
            ]}
        />
    )
}