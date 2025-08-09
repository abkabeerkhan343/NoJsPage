import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../server/storage'

export async function GET(
  request: NextRequest,
  context: any // Let Next.js handle actual type internally
) {
  const { slug } = context.params

  try {
    const category = await storage.getCategoryBySlug(slug)
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}
