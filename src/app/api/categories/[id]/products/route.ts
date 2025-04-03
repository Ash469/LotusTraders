import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('categories');

    // Find the category and get its products
    const category = await collection.findOne({ id: params.id });
    
    if (!category) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(category.products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}