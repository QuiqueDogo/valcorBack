import { Table } from 'antd'

export default function ProductTable({ data, loading }) {
    return (
        <Table
            title={() => 'Productos'}
            dataSource={data}
            loading={loading}
            rowKey="_id"
            columns={[
                { title: 'SKU', dataIndex: 'sku' },
                { title: 'Nombre', dataIndex: 'name' },
                { title: 'Precio', dataIndex: 'price' },
                { title: 'Categoría', dataIndex: 'category' },
                {
                    title: 'Stock Total',
                    dataIndex: 'totalStock'
                },
                {
                    title: 'Por sucursal',
                    render: (row) => (
                        <>
                            {row.stockByBranch?.map((s, i) => (
                                <div key={i}>
                                    {s.branch}: {s.quantity}
                                </div>
                            ))}
                        </>
                    )
                }
            ]}
        />
    )
}