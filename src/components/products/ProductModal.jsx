import { Modal, Form, Input, InputNumber } from 'antd'

export default function ProductModal({ open, onClose, onSubmit }) {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const values = await form.validateFields()
        await onSubmit(values)
        form.resetFields()
    }

    return (
        <Modal
            title="Crear producto"
            open={open}
            onCancel={onClose}
            onOk={handleOk}
        >
            <Form layout="vertical" form={form}>
                <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="price" label="Precio" rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="category" label="Categoría">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}