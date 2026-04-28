import { Button, message } from 'antd'

export default function ProcessWorkerButton() {
    const handleClick = async () => {
        await fetch('/api/worker')
        message.success('Procesamiento ejecutado')
    }

    return (
        <Button type="primary" onClick={handleClick}>
            Procesar movimientos
        </Button>
    )
}