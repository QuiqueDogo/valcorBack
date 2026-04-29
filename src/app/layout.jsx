import 'antd/dist/reset.css'
import './globals.css'
import { ConfigProvider } from 'antd'
import es_ES from 'antd/locale/es_ES'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ConfigProvider locale={es_ES}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}