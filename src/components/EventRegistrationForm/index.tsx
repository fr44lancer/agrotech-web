'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import { submitEventRegistration } from '@/app/(frontend)/_actions/submitEventRegistration'

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
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

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
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-5">{t.title}</h3>
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        {state && !state.success && (
          <div className="p-3 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200">
            {state.message ?? t.error}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.firstName} *</label>
            <input
              type="text"
              name="firstName"
              required
              disabled={isPending}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.lastName} *</label>
            <input
              type="text"
              name="lastName"
              required
              disabled={isPending}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.email} *</label>
          <input
            type="email"
            name="email"
            required
            disabled={isPending}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
          <input
            type="tel"
            name="phone"
            disabled={isPending}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
          />
        </div>
        <input type="hidden" name="event" value={eventId} />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-bold text-base hover:bg-teal-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t.registering}
            </>
          ) : (
            <>
              {t.registerBtn}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
