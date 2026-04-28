import { Table } from 'antd'

export default function StockTable({ data }) {
    return (
        <Table
            title={() => 'Stock por sucursal'}
            dataSource={data}
            rowKey="_id"
            columns={[
                {
                    title: 'Producto',
                    render: (row) => row.productId?.name
                },
                {
                    title: 'Sucursal',
                    render: (row) => row.branchId?.name
                },
                {
                    title: 'Cantidad',
                    dataIndex: 'quantity'
                }
            ]}
        />
    )
}