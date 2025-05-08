import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;

  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');
    
    // Find products with the same category ID
    const products = await collection.find({ category_id: categoryId }).toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
