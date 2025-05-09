import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  const session = await getServerSession();
  
  return NextResponse.json({
    authConfig: {
      secretConfigured: !!process.env.NEXTAUTH_SECRET,
      urlConfigured: !!process.env.NEXTAUTH_URL,
      environment: process.env.NODE_ENV || 'unknown'
    },
    isAuthenticated: !!session,
    timestamp: new Date().toISOString(),
    message: 'Auth debug information'
  });
}
