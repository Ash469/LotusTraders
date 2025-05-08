import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    
    // Try to find by string ID first
    let product = await db.collection('products').findOne({ id: params.id });
    
    // If not found, try to find by ObjectId
    if (!product) {
      try {
        product = await db.collection('products').findOne({ 
          _id: new ObjectId(params.id)
        });
      } catch (error) {
        console.log('Invalid ObjectId format:', params.id, error);
      }
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Ensure the product has an id field
    if (!product.id) {
      product.id = product._id.toString();
    }

    console.log('Found product:', product); // Debug log
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('Lotus');
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id: _id, ...updateData } = body;
    
    const result = await db.collection('products').updateOne(
      { id: params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Fetch and return the updated product
    const updatedProduct = await db.collection('products').findOne({ id: params.id });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus');

    await db.collection('products').deleteOne({
      id: params.id
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error deleting product' },
      { status: 500 }
    );
  }
}
