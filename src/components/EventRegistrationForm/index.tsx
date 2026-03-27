'use client'

import React, { useActionState, useEffect } from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { submitEventRegistration } from '@/app/(frontend)/_actions/submitEventRegistration'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

type Labels = {
  title?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  registerBtn?: string
  registering?: string
  success?: string
  error?: string
  closedTitle?: string
  closedMsg?: string
}

type Props = {
  eventId: string
  isPast?: boolean
  labels?: Labels
}

export const EventRegistrationForm: React.FC<Props> = ({ eventId, isPast = false, labels }) => {
  const t = {
    title: labels?.title ?? 'Register for this Event',
    firstName: labels?.firstName ?? 'First Name',
    lastName: labels?.lastName ?? 'Last Name',
    email: labels?.email ?? 'Email Address',
    phone: labels?.phone ?? 'Phone Number',
    registerBtn: labels?.registerBtn ?? 'Register Now',
    registering: labels?.registering ?? 'Registering…',
    success: labels?.success ?? "You've been registered! We'll see you there.",
    error: labels?.error ?? 'Something went wrong. Please try again.',
    closedTitle: labels?.closedTitle ?? 'Registration Closed',
    closedMsg:
      labels?.closedMsg ??
      'This event has already taken place. Registration is no longer available.',
  }

  const [state, formAction, isPending] = useActionState(submitEventRegistration, null)
  const [form] = Form.useForm()

  useEffect(() => {
    if (state?.success) {
      form.resetFields()
    }
  }, [state, form])

  const handleFinish = (values: Record<string, string>) => {
    const fd = new FormData()
    Object.entries(values).forEach(([k, v]) => fd.append(k, v ?? ''))
    fd.append('event', eventId)
    formAction(fd)
  }

  if (isPast) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-700 mb-2">{t.closedTitle}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{t.closedMsg}</p>
      </div>
    )
  }

  if (state?.success) {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6 text-teal-950"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-teal-800 font-medium">{t.success}</p>
      </div>
    )
  }

  return (
    <BaseWrapper>
      <h3 className="text-xl font-bold text-gray-800 mb-5">{t.title}</h3>
      {state && !state.success && (
        <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
          {state.message ?? t.error}
        </div>
      )}
      <Form form={form} layout="vertical" onFinish={handleFinish} disabled={isPending}>
        <Row gutter={16}>
          <Col xs={24} sm={24}>
            <Form.Item
              name="firstName"
              label={`${t.firstName}`}
              rules={[{ required: true, message: '' }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item
              name="lastName"
              label={`${t.lastName}`}
              rules={[{ required: true, message: '' }]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24}>
            <Form.Item
              name="email"
              label={`${t.email}`}
              rules={[{ required: true, type: 'email', message: '' }]}
            >
              <Input type="email" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24}>
            <Form.Item name="phone" label={t.phone}>
              <Input type="tel" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            size="large"
            block
            style={{ backgroundColor: '#0d9488', borderColor: '#0d9488' }}
          >
            {isPending ? t.registering : t.registerBtn}
          </Button>
        </Form.Item>
      </Form>
    </BaseWrapper>
  )
}
