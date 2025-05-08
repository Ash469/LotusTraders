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
    const db = client.db('Lotus');
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params Promise to get the id
  const { id } = await params;
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('Lotus');

    const updateData = { ...body };
    delete updateData._id;

    const result = await db.collection('categories').updateOne(
      { id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const updatedCategory = await db.collection('categories').findOne({ id });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db('Lotus');
    const result = await db.collection('categories').deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
  }
}