'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function getSessionId(): string {
  const cookieStore = cookies()
  let sessionId = cookieStore.get('session_id')?.value
  
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
  }
  
  return sessionId
}

export async function addToCart(formData: FormData) {
  const productId = formData.get('product_id') as string
  const quantity = parseInt(formData.get('quantity') as string) || 1
  const sessionId = getSessionId()

  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        productId,
        quantity,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to add item to cart')
    }

    revalidatePath('/cart')
    revalidatePath('/')
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

export async function updateCartItem(formData: FormData) {
  const itemId = formData.get('item_id') as string
  const quantity = parseInt(formData.get('quantity') as string)

  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) {
      throw new Error('Failed to update cart item')
    }

    revalidatePath('/cart')
  } catch (error) {
    console.error('Error updating cart item:', error)
  }
}

export async function removeFromCart(formData: FormData) {
  const itemId = formData.get('item_id') as string

  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/cart/${itemId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to remove cart item')
    }

    revalidatePath('/cart')
  } catch (error) {
    console.error('Error removing cart item:', error)
  }
}

export async function searchProducts(formData: FormData) {
  const query = formData.get('q') as string
  
  if (query) {
    redirect(`/search?q=${encodeURIComponent(query)}`)
  } else {
    redirect('/products')
  }
}
