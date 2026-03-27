'use client'

import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Select } from 'antd'

type SubjectOption = { value?: string | null; label?: string | null; id?: string | null }

type Labels = {
  formTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  send: string
  sending: string
  successMsg: string
  errorMsg: string
  subjectOptions: SubjectOption[]
}

export default function ContactForm({ labels }: { labels: Labels }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form] = Form.useForm()

  const handleFinish = async (values: Record<string, string>) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
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

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{labels.formTitle}</h2>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-teal-700 font-semibold text-lg">{labels.successMsg}</p>
        </div>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleFinish} disabled={status === 'sending'}>
          {status === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {labels.errorMsg}
            </div>
          )}

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstName"
                label={`${labels.firstName}`}
                rules={[{ required: true, message: '' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="lastName" label={labels.lastName}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="email"
                label={`${labels.email}`}
                rules={[{ required: true, type: 'email', message: '' }]}
              >
                <Input type="email" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label={labels.phone}>
                <Input type="tel" size="large" placeholder="+374" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="company" label={labels.company}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="subject" label={labels.subject}>
                {labels.subjectOptions.length > 0 ? (
                  <Select
                    size="large"
                    options={labels.subjectOptions.map((opt) => ({
                      value: opt.value ?? '',
                      label: opt.label ?? opt.value ?? '',
                    }))}
                  />
                ) : (
                  <Input size="large" />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="message"
            label={`${labels.message}`}
            rules={[{ required: true, message: '' }]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={status === 'sending'}
              size="large"
              block
              icon={
                status !== 'sending' ? (
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                ) : undefined
              }
              iconPosition="end"
              style={{ backgroundColor: '#0d9488', borderColor: '#0d9488', height: 52 }}
            >
              {status === 'sending' ? labels.sending : labels.send}
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
