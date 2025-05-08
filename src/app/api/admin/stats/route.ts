import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('Lotus') 

    const [
      totalProducts,
      totalCategories,
      pendingEnquiries
    ] = await Promise.all([
      db.collection('products').countDocuments(),
      db.collection('categories').countDocuments(),
      db.collection('enquiry')?.countDocuments({ status: 'new' }) || 0
    ])

    return NextResponse.json({
      totalProducts,
      totalCategories,
      pendingEnquiries,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Error fetching admin stats', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
