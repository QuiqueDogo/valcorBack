'use client'

import { Layout, Menu, Button, theme } from 'antd'
import {
    AppstoreOutlined,
    ShopOutlined,
    SwapOutlined,
    BarChartOutlined,
    MenuOutlined
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

const { Sider, Content, Header } = Layout

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const items = [
        {
            key: '/dashboard/products',
            icon: <AppstoreOutlined />,
            label: 'Productos'
        },
        {
            key: '/dashboard/branches',
            icon: <ShopOutlined />,
            label: 'Sucursales'
        },
        {
            key: '/dashboard/movements',
            icon: <SwapOutlined />,
            label: 'Movimientos'
        },
        {
            key: '/dashboard/reports',
            icon: <BarChartOutlined />,
            label: 'Reportes'
        }
    ]

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    setCollapsed(broken)
                }}
                onCollapse={(value) => setCollapsed(value)}
                collapsed={collapsed}
                trigger={null}
            >
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: 4
                    }}>
                        Inventario
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={items}
                        onClick={({ key }) => router.push(key)}
                    />

                    <div style={{ marginTop: 'auto', padding: '16px' }}>
                        <Button
                            type='primary'
                            block
                            onClick={() => {
                                localStorage.removeItem('token')
                                window.location.href = '/login'
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </Sider>

            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: 8,
                    overflow: 'initial'
                }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}