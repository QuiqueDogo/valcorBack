'use client'

import { Layout, Menu } from 'antd'
import {
    AppstoreOutlined,
    ShopOutlined,
    SwapOutlined,
    BarChartOutlined
} from '@ant-design/icons'
import { useRouter, usePathname } from 'next/navigation'

const { Sider, Content } = Layout

export default function DashboardLayout({ children }) {
    const router = useRouter()
    const pathname = usePathname()

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
            <Sider>
                <div style={{ color: '#fff', padding: 16 }}>
                    StockFlow
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={items}
                    onClick={({ key }) => router.push(key)}
                />
            </Sider>

            <Layout>
                <Content style={{ padding: 24 }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}