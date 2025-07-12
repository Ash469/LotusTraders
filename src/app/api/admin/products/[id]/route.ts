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
    // Await the params Promise to get the id
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const product = await getProductById(id);

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

    // Remove _id if present to avoid immutable field error
    if ('_id' in body) {
      delete body._id;
    }

    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');

    // Update the entire product document except _id
    const result = await collection.updateOne(
      { id },
      { $set: { ...body } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Revalidate the cache
    revalidateTag('product');

    return NextResponse.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('Lotus');

    const result = await db.collection('products').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Revalidate the cache
    revalidateTag('product');

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
}
