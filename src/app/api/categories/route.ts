import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('categories');

    const categories = await collection.find({}).toArray();
    // Transform _id to string before sending
    const transformedCategories = categories.map(cat => ({
      ...cat,
      _id: cat._id.toString()
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}