import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { unstable_cache, revalidateTag } from 'next/cache';


const getProduct = unstable_cache(
  async (id: string) => {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');
    return collection.findOne({id});
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

    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');

    const result = await collection.updateOne(
      { id },
      { $set: { 'details.information': body.information } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Revalidate the cache
    revalidateTag('product');

    return NextResponse.json({ message: 'Product information updated successfully' });
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
