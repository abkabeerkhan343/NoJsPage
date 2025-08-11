import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../../server/storage'; // Fix this import path!

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
