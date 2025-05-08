import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('term');

  if (!searchTerm) {
    return NextResponse.json(
      { error: 'Search term is required' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const collection = db.collection('products');
    
    // Search for products that match the search term in name or category
    const products = await collection.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category_id: { $regex: searchTerm, $options: 'i' } }
      ]
    }).toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
