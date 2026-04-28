import { Button, message } from 'antd'

export default function ProcessWorkerButton({ onDone }) {
    const handleClick = async () => {
        await fetch('/api/worker')
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