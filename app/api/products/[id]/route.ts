import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../server/storage'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await storage.getProduct(params.id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}