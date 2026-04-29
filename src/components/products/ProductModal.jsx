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
            cancelText='Cancelar'
            okText='Crear'
        >
            <Form layout="vertical" form={form}>
                <Form.Item name="sku" label="SKU" rules={[{ required: true, message: 'Por favor ingrese un SKU' }, { max: 12, message: 'Max. 12 caracteres' }]}>
                    <Input placeholder='p.e. SKU123456' />
                </Form.Item>

                <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Por favor ingrese un nombre' }, { max: 50, message: 'Max. 50 caracteres' }]}>
                    <Input placeholder='p.e. Producto 1' />
                </Form.Item>

                <Form.Item name="price" label="Precio" rules={[{ required: true, message: 'Por favor ingrese un precio' }]}>
                    <InputNumber min={0} maxLength={7} precision={2} style={{ width: '100%' }} placeholder='p.e. 1000' />
                </Form.Item>

                <Form.Item name="category" label="Categoría" >
                    <Input placeholder='p.e. Categoría 1' />
                </Form.Item>
            </Form>
        </Modal>
    )
}