'use client'

import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, InputNumber } from 'antd'

export default function Page() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const [branches, setBranches] = useState([])
  const [openBranch, setOpenBranch] = useState(false)
  const [formBranch] = Form.useForm()

  const fetchBranches = async () => {
    const res = await fetch('/api/branches', { cache: 'no-store' })
    const data = await res.json()
    setBranches(data)
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const handleCreateBranch = async () => {
    const values = await formBranch.validateFields()

    await fetch('/api/branches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    setOpenBranch(false)
    formBranch.resetFields()
    fetchBranches()
  }

  const fetchData = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' })
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreate = async () => {
    const values = await form.validateFields()

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    setOpen(false)
    form.resetFields()
    fetchData()
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Nuevo producto
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={data}
        rowKey="_id"
        columns={[
          { title: 'SKU', dataIndex: 'sku' },
          { title: 'Nombre', dataIndex: 'name' },
          { title: 'Precio', dataIndex: 'price' }
        ]}
      />

      <Modal
        title="Crear producto"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleCreate}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Nombre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Precio" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}