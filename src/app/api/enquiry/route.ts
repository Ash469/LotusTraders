import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('Lotus'); // Use exact case as your existing database
        const collection = db.collection('enquiry'); // Use your existing collection name

        const data = await request.json();

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'message', 'product'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Add timestamp and status to the enquiry data
        const enquiryData = {
            ...data,
            createdAt: new Date(),
            status: 'new'
        };

        const result = await collection.insertOne(enquiryData);

        if (!result.insertedId) {
            throw new Error('Failed to insert enquiry');
        }

        return NextResponse.json({
            success: true,
            message: 'Enquiry submitted successfully',
            id: result.insertedId
        }, { status: 200 });

    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({
            success: false,
            error: 'Database operation failed: ' + (error instanceof Error ? error.message : 'Unknown error')
        }, { status: 500 });
    }
}