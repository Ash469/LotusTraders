// app/api/admin/enquiries/[id]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { status } = await request.json();
    const client = await clientPromise;
    const db = client.db('Lotus');

    const result = await db.collection('enquiry').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This endpoint supports PATCH requests only" }, { status: 405 });
}
