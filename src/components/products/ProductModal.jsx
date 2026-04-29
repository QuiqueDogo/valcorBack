import { Modal, Form, Input, InputNumber } from 'antd'

export default function ProductModal({ open, onClose, onSubmit }) {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const values = await form.validateFields()
        await onSubmit(values)
        form.resetFields();
    }

    return (
        <Modal
            title="Crear producto"
            open={open}
            onCancel={onClose}
            onOk={handleOk}
        >
            <Form layout="vertical" form={form}>
                <Form.Item name="sku" label="SKU" rules={[{ required: true, message: 'Por favor ingrese un SKU' }, { max: 12, message: 'Max. 12 caracteres' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese un nombre' }, { max: 50, message: 'Max. 50 caracteres' }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="price" label="Precio" rules={[{ required: true, message: 'Por favor ingrese un precio' }]}>
                    <InputNumber min={0} maxLength={7} precision={2} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item name="category" label="Categoría">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}