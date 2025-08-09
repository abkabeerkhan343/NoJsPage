import { NextRequest, NextResponse } from 'next/server'
import { storage } from '../../../../server/storage'

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { params } = context

  try {
    const category = await storage.getCategoryBySlug(params.slug)
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}
