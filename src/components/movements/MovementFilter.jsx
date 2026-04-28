import { Select } from 'antd'

export default function MovementFilter({ onChange }) {
    return (
        <Select
            placeholder="Filtrar por estado"
            style={{ width: 200 }}
            onChange={onChange}
            allowClear
            options={[
                { value: 'pending', label: 'Pending' },
                { value: 'processed', label: 'Processed' },
                { value: 'failed', label: 'Failed' }
            ]}
        />
    )
}