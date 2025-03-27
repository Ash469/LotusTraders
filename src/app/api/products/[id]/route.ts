import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { unstable_cache } from 'next/cache';

// Cache product data for 1 hour
const getProduct = unstable_cache(
  async (id: string) => {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');
    return collection.findOne({ id: parseInt(id, 10) });
  },
  ['product'],
  { revalidate: 3600 }
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise to get the id
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const product = await getProduct(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Clean up response data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...cleanedProduct } = product;
    return NextResponse.json(cleanedProduct);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}