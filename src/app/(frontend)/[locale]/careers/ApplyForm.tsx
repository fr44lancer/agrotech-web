'use client'

import React, { useState } from 'react'

const labels = {
  en: {
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    message: 'Cover Letter / Message',
    submit: 'Submit Application',
    sending: 'Sending…',
    success: 'Your application has been submitted! We will be in touch.',
    error: 'Something went wrong. Please try again.',
    required: 'Name and email are required.',
  },
  ru: {
    name: 'Полное имя',
    email: 'Электронная почта',
    phone: 'Номер телефона',
    message: 'Сопроводительное письмо / Сообщение',
    submit: 'Отправить заявку',
    sending: 'Отправка…',
    success: 'Ваша заявка отправлена! Мы свяжемся с вами.',
    error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
    required: 'Имя и электронная почта обязательны.',
  },
  hy: {
    name: 'Անուն Ազգանուն',
    email: 'Էլ. հասցե',
    phone: 'Հեռախոսահամար',
    message: 'Ուղեկցող նամակ / Հաղորդագրություն',
    submit: 'Ուղարկել դիմումը',
    sending: 'Ուղարկվում է…',
    success: 'Ձեր դիմումն ուղարկվել է: Մենք կապ կհաստատենք:',
    error: 'Ինչ-որ բան սխալ է: Խնդրում ենք նորից փորձել:',
    required: 'Անունը և էլ. հասցեն պարտադիր են:',
  },
}

type Props = {
  careerId: string
  locale?: string
}

export default function ApplyForm({ careerId, locale = 'hy' }: Props) {
  const t = labels[locale as keyof typeof labels] ?? labels.hy

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setStatus('error')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, careerId }),
      })
      setStatus(res.ok ? 'success' : 'error')
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.name} *</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-600 text-sm">{t.error}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-teal-700 transition disabled:opacity-60"
      >
        {status === 'sending' ? t.sending : t.submit}
      </button>
    </form>
  )
}
