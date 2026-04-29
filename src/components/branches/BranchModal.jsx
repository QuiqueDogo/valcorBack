import { Modal, Form, Input } from 'antd'

export default function BranchModal({ open, onClose, onSubmit }) {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const values = await form.validateFields()
        await onSubmit(values)
        form.resetFields()
    }

    return (
        <Modal
            title="Crear sucursal"
            open={open}
            onCancel={onClose}
            onOk={handleOk}
            cancelText='Cancelar'
            okText='Crear'
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }, { max: 50, message: 'Max. 50 caracteres' }]}
                >
                    <Input placeholder='p.e. Sucursal Principal' />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Ubicación"
                    rules={[{ max: 100, message: 'Max. 100 caracteres' }]}
                >
                    <Input placeholder='p.e. Calle 123' />
                </Form.Item>
            </Form>
        </Modal>
    )
}