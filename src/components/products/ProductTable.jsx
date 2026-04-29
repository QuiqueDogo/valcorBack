import { Button, Modal, Table } from 'antd'
import { useState } from 'react'

export default function ProductTable({ data, loading }) {
    const [openModal, setOpenModal] = useState(false)
    const [stock, setStock] = useState([])
    return (
        <>
            <Table
                title={() => 'Productos'}
                dataSource={data}
                loading={loading}
                rowKey="_id"
                scroll={{ x: 'max-content' }}
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
                                <Button onClick={() => { setOpenModal(true); setStock(row) }}>Ver Stock</Button>


                            </>
                        )
                    }
                ]}
            />
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title='Stock por sucursal'
                cancelButtonProps={{ hidden: true }}
                okText='Cerrar'
                onOk={() => setOpenModal(false)}
                onCancel={() => setOpenModal(false)}
            >
                {stock.stockByBranch?.map((s, i) => (
                    <div key={i}>
                        {s.branch}: {s.quantity}
                    </div>
                ))}

            </Modal>

        </>
    )
}