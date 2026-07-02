import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth/next';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// GET all blogs
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    
    // Sort by latest published
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();
    
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST a new blog (Admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, author, tags } = body;
    
    if (!title || !slug || !content || !coverImage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if slug exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ error: 'A blog with this slug already exists' }, { status: 400 });
    }

    const newBlog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || title.substring(0, 100) + '...',
      content,
      coverImage,
      author: author || 'Admin',
      tags: tags || [],
      status: 'published',
      publishedAt: new Date()
    });
    
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error.message || 'Failed to create blog' }, { status: 500 });
  }
}
