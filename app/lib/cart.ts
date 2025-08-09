import { cookies } from 'next/headers'
import { CartItemWithProduct } from '@shared/schema'

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get('session_id')?.value

  if (!sessionId) {
    return []
  }

  try {
    const response = await fetch(`${process.env.API_URL || 'http://localhost:5000'}/api/cart/${sessionId}`)
    
    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching cart items:', error)
    return []
  }
}

export async function getCartCount(): Promise<number> {
  const items = await getCartItems()
  return items.reduce((count, item) => count + item.quantity, 0)
}
