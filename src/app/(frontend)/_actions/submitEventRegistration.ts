'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function submitEventRegistration(prevState: any, formData: FormData) {
  try {
    const payload = await getPayload({ config: configPromise })

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const event = formData.get('event') as string

    // Basic Validation
    if (!firstName || !lastName || !email || !event) {
      return { success: false, message: 'Please fill in all required fields.' }
    }

    // Insert into Payload CMS
    await payload.create({
      collection: 'event-registrations',
      data: {
        firstName,
        lastName,
        email,
        phone,
        event,
      },
    })

    return { success: true, message: 'You have successfully registered for the event!' }
  } catch (err: any) {
    console.error('Event Registration Error: ', err)
    return { success: false, message: 'There was an error registering. Please try again later.' }
  }
}
