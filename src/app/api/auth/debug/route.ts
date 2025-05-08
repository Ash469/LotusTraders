import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    authConfig: {
      secretConfigured: !!process.env.NEXTAUTH_SECRET,
      urlConfigured: !!process.env.NEXTAUTH_URL,
      environment: process.env.NODE_ENV || 'unknown'
    },
    timestamp: new Date().toISOString(),
    message: 'Auth debug information'
  });
}
