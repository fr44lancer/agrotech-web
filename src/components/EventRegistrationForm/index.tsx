'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import { submitEventRegistration } from '@/app/(frontend)/_actions/submitEventRegistration'

export const EventRegistrationForm: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [state, formAction, isPending] = useActionState(submitEventRegistration, null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Register for Event</h3>
      <form ref={formRef} action={formAction} className="flex flex-col gap-4">
        {state && (
          <div
            className={`p-3 rounded text-sm font-medium ${
              state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {state.message}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">First Name</span>
            <input type="text" name="firstName" required disabled={isPending} className="border p-2 rounded" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium">Last Name</span>
            <input type="text" name="lastName" required disabled={isPending} className="border p-2 rounded" />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input type="email" name="email" required disabled={isPending} className="border p-2 rounded" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Phone (optional)</span>
          <input type="tel" name="phone" disabled={isPending} className="border p-2 rounded" />
        </label>
        <input type="hidden" name="event" value={eventId} />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 disabled:opacity-50 text-white p-3 rounded font-medium hover:bg-blue-700 transition"
        >
          {isPending ? 'Registering...' : 'Register Now'}
        </button>
      </form>
    </div>
  )
}
