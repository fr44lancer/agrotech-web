'use client'

import React, { useState } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'

type Labels = {
  name?: string
  email?: string
  phone?: string
  message?: string
  submit?: string
  sending?: string
  success?: string
  error?: string
}

type Props = {
  careerId: string
  locale?: string
  labels?: Labels
}

export default function ApplyForm({ careerId, labels }: Props) {
  const t = {
    name: labels?.name ?? 'Full Name',
    email: labels?.email ?? 'Email Address',
    phone: labels?.phone ?? 'Phone Number',
    message: labels?.message ?? 'Cover Letter / Message',
    submit: labels?.submit ?? 'Submit Application',
    sending: labels?.sending ?? 'Sending…',
    success: labels?.success ?? 'Your application has been submitted! We will be in touch.',
    error: labels?.error ?? 'Something went wrong. Please try again.',
  }

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form] = Form.useForm()

  const handleFinish = async (values: Record<string, string>) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, careerId }),
      })
      if (res.ok) {
        setStatus('success')
        form.resetFields()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 text-teal-800 text-center font-medium">
        {t.success}
      </div>
    )
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} disabled={status === 'sending'}>
      {status === 'error' && <p className="text-red-600 text-sm mb-4">{t.error}</p>}

      <Row gutter={16}>
        <Col xs={24}>
          <Form.Item name="name" label={`${t.name}`} rules={[{ required: true, message: '' }]}>
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="email"
            label={`${t.email}`}
            rules={[{ required: true, type: 'email', message: '' }]}
          >
            <Input type="email" size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="phone" label={t.phone}>
        <Input type="tel" size="large" />
      </Form.Item>

      <Form.Item name="message" label={t.message}>
        <Input.TextArea rows={5} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={status === 'sending'}
          size="large"
          className={'w-full'}
          style={{ backgroundColor: '#0d9488', borderColor: '#0d9488' }}
        >
          {status === 'sending' ? t.sending : t.submit}
        </Button>
      </Form.Item>
    </Form>
  )
}
