'use client'

import React, { useState } from 'react'

type Labels = {
  name?: string; email?: string; phone?: string; message?: string
  submit?: string; sending?: string; success?: string; error?: string
}

type Props = {
  careerId: string
  locale?: string
  labels?: Labels
}

export default function ApplyForm({ careerId, locale = 'hy', labels }: Props) {
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
