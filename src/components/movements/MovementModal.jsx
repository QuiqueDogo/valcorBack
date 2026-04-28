'use client'

import { Modal, Form, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'

export default function MovementModal({ open, onClose, onSubmit }) {
    const [form] = Form.useForm()
    const [products, setProducts] = useState([])
    const [branches, setBranches] = useState([])

    const type = Form.useWatch('type', form)
    const productId = Form.useWatch('productId', form)
    const fromBranchId = Form.useWatch('fromBranchId', form)
    const [availableStock, setAvailableStock] = useState(0)

    useEffect(() => {
        fetch('/api/products')
            .then(r => r.json())
            .then(setProducts)

        fetch('/api/branches')
            .then(r => r.json())
            .then(setBranches)
    }, [])
    useEffect(() => {
        if (type === 'OUT' && productId && fromBranchId) {
            fetch(`/api/stock/available?productId=${productId}&branchId=${fromBranchId}`)
                .then(r => r.json())
                .then(data => setAvailableStock(data.quantity))
        } else {
            setAvailableStock(0)
        }
    }, [type, productId, fromBranchId])

    const handleOk = async () => {
        const values = await form.validateFields()
        await onSubmit(values)
        form.resetFields()
    }

    useEffect(() => {
        form.setFieldsValue({
            fromBranchId: undefined,
            toBranchId: undefined
        })
    }, [type])

    return (
        <Modal
            title="Crear movimiento"
            open={open}
            onCancel={onClose}
            onOk={handleOk}
        >
            <Form layout="vertical" form={form}>

                <Form.Item name="type" label="Tipo" rules={[{ required: true }]}>
                    <Select
                        options={[
                            { value: 'IN', label: 'Entrada' },
                            { value: 'OUT', label: 'Salida' },
                            { value: 'TRANSFER', label: 'Transferencia' }
                        ]}
                    />
                </Form.Item>

                <Form.Item name="productId" label="Producto" rules={[{ required: true }]}>
                    <Select
                        options={products.map(p => ({
                            value: p._id,
                            label: p.name
                        }))}
                    />
                </Form.Item>

                {type !== 'IN' && (
                    <Form.Item
                        name="fromBranchId"
                        label="Sucursal origen"
                        rules={[{ required: type !== 'IN' }]}
                    >
                        <Select
                            options={branches.map(b => ({
                                value: b._id,
                                label: b.name
                            }))}
                        />
                    </Form.Item>
                )}

                {type === 'OUT' && fromBranchId && (
                    <div style={{ marginBottom: 10 }}>
                        Stock disponible: <b>{availableStock}</b>
                    </div>
                )}
                {type !== 'OUT' && (
                    <Form.Item
                        name="toBranchId"
                        label="Sucursal destino"
                        rules={[{ required: type !== 'OUT' }]}
                    >
                        <Select
                            options={branches.map(b => ({
                                value: b._id,
                                label: b.name
                            }))}
                        />
                    </Form.Item>
                )}
                <Form.Item
                    name="quantity"
                    label="Cantidad"
                    rules={[
                        { required: true },
                        {
                            validator(_, value) {
                                if (type === 'OUT' && value > availableStock) {
                                    return Promise.reject('No hay stock suficiente en la sucursal')
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        </Modal>
    )
}