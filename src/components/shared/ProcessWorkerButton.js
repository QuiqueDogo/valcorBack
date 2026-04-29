import { Button, message } from 'antd'
import { apiFetch } from '@/lib/api'

export default function ProcessWorkerButton({ onDone }) {
    const handleClick = async () => {
        await apiFetch('/api/worker')
        message.success('Procesamiento ejecutado')

        if (onDone) {
            await onDone()
        }
    }

    return (
        <Button type="primary" onClick={handleClick}>
            Procesar movimientos
        </Button>
    )
}