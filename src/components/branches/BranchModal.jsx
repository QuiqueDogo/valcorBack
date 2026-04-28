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
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="location" label="Ubicación">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}