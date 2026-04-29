import { Button, message } from 'antd'
import { apiFetch } from '@/lib/api'

export default function ProcessWorkerButton({ onDone }) {
    const handleClick = async () => {
        const data = await apiFetch('/api/worker')
        message.success(data.message)

        if (onDone) {
            await onDone()
        }
    }

    return (
        <Button type="primary" onClick={handleClick}>
            Procesar 10 movimientos
        </Button>
    )
}