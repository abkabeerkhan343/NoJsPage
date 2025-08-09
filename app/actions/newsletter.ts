'use server'

import { revalidatePath } from 'next/cache'

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string

  if (!email) {
    return { error: 'Email is required' }
  }

  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe to newsletter')
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return { error: 'Failed to subscribe. Please try again.' }
  }
}
