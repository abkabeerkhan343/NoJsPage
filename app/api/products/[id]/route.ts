import { NextRequest, NextResponse } from 'next/server'
import { getProduct } from '../../../lib/products'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } } // Explicitly define params as a plain object
) {
  const { id } = context.params // Access params directly

  try {
    const product = await getProduct(id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}