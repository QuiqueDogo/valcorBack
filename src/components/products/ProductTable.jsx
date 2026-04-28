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
                { title: 'Categoría', dataIndex: 'category' }
            ]}
        />
    )
}