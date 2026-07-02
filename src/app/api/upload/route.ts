import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Note: Ensure these are set in .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder',
  api_key: process.env.CLOUDINARY_API_KEY || 'placeholder',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder',
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read file as ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a Promise
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'lotus_blogs' }, // Store in specific folder
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    console.error('Error uploading to Cloudinary:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
