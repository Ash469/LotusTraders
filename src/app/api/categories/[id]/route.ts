import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params Promise to get the id
  const { id: categoryId } = await params;

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('lotus');
    const collection = db.collection('categories');

    // Find the category by ID
    const category = await collection.findOne({ id: categoryId });

    if (category) {
      return NextResponse.json(category);
    } else {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}