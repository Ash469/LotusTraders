import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Auth helper functions
export async function getSession() {
  return await getServerSession();
}

// Check if user is authenticated on the server side
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    redirect('/admin/login');
  }
  
  return session;
}

// Get token with NextAuth JWT - using NextRequest instead of Request
export async function getAuthToken(req: NextRequest) {
  return await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
}
