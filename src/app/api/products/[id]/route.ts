import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { revalidateTag } from 'next/cache';

// Fetch product by id (no cache, real-time)
async function getProductById(id: string) {
  const client = await clientPromise;
  const db = client.db('Lotus');
  const collection = db.collection('products');
  return collection.findOne({ id });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...cleanedProduct } = product;
    return NextResponse.json(cleanedProduct);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    if (!body.information) {
      return NextResponse.json({ error: 'Missing information data' }, { status: 400 });
    }

    // Check if product exists before updating
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }



    // Revalidate the cache (if used elsewhere)
    revalidateTag('product');
    return NextResponse.json({ message: 'Product information updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}