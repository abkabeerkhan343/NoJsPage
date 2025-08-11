import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../server/storage';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }  // <-- correct shape here
) {
  const { id } = context.params;

  try {
    const product = await storage.getProductById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
