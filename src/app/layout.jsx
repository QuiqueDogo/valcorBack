'use client'
import 'antd/dist/reset.css'
import { Layout } from 'antd'

const { Header, Content } = Layout

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ color: '#fff' }}>
            StockFlow
          </Header>
          <Content style={{ padding: 24 }}>
            {children}
          </Content>
        </Layout>
      </body>
    </html>
  )
}