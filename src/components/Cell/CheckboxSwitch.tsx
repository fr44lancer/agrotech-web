'use client'
import React, { useState } from 'react'
import { Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

type Props = {
  cellData: boolean
  rowData: { id: string | number }
}

export function PublishedSwitchCell({ cellData, rowData }: Props) {
  const [checked, setChecked] = useState<boolean>(Boolean(cellData))
  const [loading, setLoading] = useState(false)

  const handleToggle = async (value: boolean) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products/${rowData.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: value }),
      })
      if (res.ok) {
        setChecked(value)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Switch
      checked={checked}
      loading={loading}
      onChange={handleToggle}
      size="small"
      style={{boxShadow: '0 0 0 1px #5f5b5b', padding:'1px 2px',minWidth: '40px'}}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}

     />
  )
}
