import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, message, careerId } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'careerApplications',
      data: {
        name,
        email,
        phone: phone || undefined,
        message: message || undefined,
        career: careerId || undefined,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 })
  }
}
