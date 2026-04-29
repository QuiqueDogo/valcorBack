'use client'

import { Form, Input, Button, Card, message, Alert, Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Text, Title } = Typography

export default function LoginPage() {
    const router = useRouter()

    const onFinish = async (values) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            })

            const data = await res.json()

            if (!res.ok) {
                return message.error(data.message || 'Error al iniciar sesión')
            }

            localStorage.setItem('token', data.token)

            message.success('Login correcto')
            router.push('/') // dashboard

        } catch (err) {
            message.error('Error de conexión')
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #1677ff 0%, #001529 100%)',
            padding: '20px'
        }}>
            <Card
                style={{
                    width: 400,
                    borderRadius: 16,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    padding: '32px'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={3} style={{ margin: 0, color: '#1677ff' }}>Inventario </Title>
                    <Text type="secondary">Inicia sesión para gestionar tu inventario</Text>
                </div>

                <Alert
                    title="Acceso de prueba"
                    description={
                        <div style={{ fontSize: '12px' }}>
                            Email: <b>admin@test.com</b><br />
                            Password: <b>123456</b>
                        </div>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: 24, borderRadius: 8 }}
                />

                <Form layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item
                        name="email"
                        label="Correo Electrónico"
                        rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}
                    >
                        <Input placeholder="admin@test.com" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
                    >
                        <Input.Password placeholder="••••••" />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 8 }}>
                        <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 8, height: 48 }}>
                            Iniciar sesión
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                        © 2024 Inventario. Todos los derechos reservados a quien quiera usarlos.
                    </Text>
                </div>
            </Card>
        </div>
    )
}