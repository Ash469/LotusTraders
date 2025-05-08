import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Create buffer from file
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Get file extension
    const fileExtension = path.extname(file.name).toLowerCase();
    
    // Only accept image files
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Create unique filename
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    
    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'new_images');
    await mkdir(uploadDir, { recursive: true });
    
    // Save the file
    const filePath = path.join(uploadDir, uniqueFilename);
    await writeFile(filePath, buffer);
    
    // Return the path that will be stored in the database
    const relativePath = `/assets/new_images/${uniqueFilename}`;
    
    return NextResponse.json({ 
      success: true, 
      filePath: relativePath 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
