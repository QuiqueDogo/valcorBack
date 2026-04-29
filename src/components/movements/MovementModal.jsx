'use client'

import { Modal, Form, InputNumber, Select, message } from 'antd'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'

export default function MovementModal({ open, onClose, onSubmit }) {
    const [form] = Form.useForm()
    const [products, setProducts] = useState([])
    const [branches, setBranches] = useState([])

    const type = Form.useWatch('type', form)
    const productId = Form.useWatch('productId', form)
    const fromBranchId = Form.useWatch('fromBranchId', form)
    const [availableStock, setAvailableStock] = useState(0)

    useEffect(() => {
        apiFetch('/api/products')
            .then(setProducts)

        apiFetch('/api/branches')
            .then(setBranches)
    }, [])
    useEffect(() => {
        if ((type === 'OUT' || type === 'TRANSFER') && productId && fromBranchId) {
            apiFetch(`/api/stock/available?productId=${productId}&branchId=${fromBranchId}`)
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
                        placeholder='Seleccione un tipo'
                        options={[
                            { value: 'IN', label: 'Entrada' },
                            { value: 'OUT', label: 'Salida' },
                            { value: 'TRANSFER', label: 'Transferencia' }
                        ]}
                    />
                </Form.Item>

                <Form.Item name="productId" label="Producto" rules={[{ required: true }]}>
                    <Select
                        placeholder='Seleccione un producto'
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
                        rules={[{ required: type !== 'IN', message: 'Por favor seleccione la sucursal origen' }]}
                    >
                        <Select
                            placeholder='Seleccione una sucursal'
                            options={branches.map(b => ({
                                value: b._id,
                                label: b.name
                            }))}
                        />
                    </Form.Item>
                )}

                {(type === 'OUT' || type === 'TRANSFER') && fromBranchId && (
                    <div style={{ marginBottom: 10 }}>
                        Stock disponible: <b style={{ color: availableStock === 0 ? 'red' : 'inherit' }}>
                            {availableStock}
                        </b>
                    </div>
                )}
                {type !== 'OUT' && (
                    <Form.Item
                        name="toBranchId"
                        label="Sucursal destino"
                        rules={[{ required: type !== 'OUT', message: 'Por favor ingrese una sucursal destino' }]}
                    >
                        <Select
                            placeholder='Seleccione una sucursal'
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
                        { required: true, message: 'Por favor ingrese una cantidad' },
                        {
                            validator(_, value) {
                                if (type === 'TRANSFER') {
                                    const toBranchId = form.getFieldValue('toBranchId')
                                    if (value && fromBranchId && toBranchId && fromBranchId === toBranchId) {
                                        return Promise.reject('No puedes transferir a la misma sucursal')
                                    }
                                }

                                if ((type === 'OUT' || type === 'TRANSFER') && value > availableStock) {
                                    return Promise.reject('No hay stock suficiente en la sucursal')
                                }

                                return Promise.resolve()
                            }
                        }
                    ]}
                >
                    <InputNumber placeholder='0' style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        </Modal>
    )
}