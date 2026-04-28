'use client'

import { useEffect, useState } from 'react'
import { Button } from 'antd'

import ProductTable from '@/components/products/ProductTable'
import ProductModal from '@/components/products/ProductModal'
import StockTable from '@/components/stock/StockTable'
import MovementTable from '@/components/movements/MovementTable'
import MovementFilter from '@/components/movements/MovementFilter'
import ReportTable from '@/components/reports/ReportTable'
import ProcessWorkerButton from '@/components/shared/ProcessWorkerButton'

export default function Page() {
  const [products, setProducts] = useState([])
  const [stock, setStock] = useState([])
  const [movements, setMovements] = useState([])
  const [report, setReport] = useState([])
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState()

  const fetchAll = async () => {
    const [p, s, m, r] = await Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/stock').then(r => r.json()),
      fetch('/api/movements').then(r => r.json()),
      fetch('/api/reports').then(r => r.json())
    ])

    setProducts(p)
    setStock(s)
    setMovements(m)
    setReport(r)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleCreate = async (values) => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    setOpen(false)
    fetchAll()
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Nuevo producto
      </Button>

      <ProcessWorkerButton />

      <MovementFilter onChange={setStatus} />

      <ProductTable data={products} />
      <StockTable data={stock} />
      <MovementTable
        data={status ? movements.filter(m => m.status === status) : movements}
      />
      <ReportTable data={report} />

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
      />
    </>
  )
}