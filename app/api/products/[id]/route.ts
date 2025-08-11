import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '../../../lib/products';
import { RouteParams } from '../../../../shared/schema';
 // yahi se import

export async function GET(
  request: NextRequest,
  { params }: RouteParams<'id'>
) {
  const { id } = params;

  try {
    const product = await getProduct(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
