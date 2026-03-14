'use client'

import React, { useState } from 'react'

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fd)),
      })
      if (res.ok) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-800'

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">{labels.formTitle}</h2>

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-teal-700 font-semibold text-lg">{labels.successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {labels.errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.firstName} *</label>
              <input type="text" name="firstName" required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.lastName}</label>
              <input type="text" name="lastName" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.email} *</label>
              <input type="email" name="email" required className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.phone}</label>
              <input type="tel" name="phone" className={inputCls} placeholder="+374" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.company}</label>
              <input type="text" name="company" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.subject}</label>
              {labels.subjectOptions.length > 0 ? (
                <select name="subject" className={inputCls}>
                  {labels.subjectOptions.map((opt, i) => (
                    <option key={opt.value ?? i} value={opt.value ?? ''}>
                      {opt.label ?? opt.value}
                    </option>
                  ))}
                </select>
              ) : (
                <input type="text" name="subject" className={inputCls} />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{labels.message} *</label>
            <textarea name="message" required rows={5} className={`${inputCls} resize-none`} />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-teal-600 text-white font-semibold flex items-center justify-center py-4 rounded-xl hover:bg-teal-700 transition shadow-sm gap-2 group disabled:opacity-60"
          >
            {status === 'sending' ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {labels.sending}
              </>
            ) : (
              <>
                {labels.send}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
