import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus'); // Specify the correct database name
    const products = await db.collection('products').find({}).toArray();
    
    console.log(`Found ${products.length} products`); // Debug log
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error fetching products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('Lotus'); // Specify the correct database name
    const product = await request.json();
    
    const result = await db.collection('products').insertOne(product);
    return NextResponse.json({ 
      ...product, 
      _id: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error creating product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
