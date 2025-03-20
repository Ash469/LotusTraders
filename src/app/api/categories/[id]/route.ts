import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Your MongoDB connection utility

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id: categoryId } = params;

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('lotus'); // Replace with your database name
    const collection = db.collection('categories'); // Replace with your collection name

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