import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, company, subject, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'contactSubmissions',
      data: { firstName, lastName, email, phone, company, subject, message },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
