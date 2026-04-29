
import { Table } from 'antd'

export default function BranchTable({ data }) {
    return (
        <Table
            title={() => 'Sucursales'}
            dataSource={data}
            rowKey="_id"
            scroll={{ x: 'max-content' }}
            columns={[
                { title: 'Nombre', dataIndex: 'name' },
                { title: 'Ubicación', dataIndex: 'location' }
            ]}
        />
    )
}