import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Extend Session type to include user.id
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

// In a real app, these would be in a database
const ADMIN_EMAIL = 'admin@lotus.com'
const ADMIN_PASSWORD = 'admin123' 

// Ensure NEXTAUTH_SECRET exists with a fallback for development
const SECRET = process.env.NEXTAUTH_SECRET || 'THIS_IS_A_DEVELOPMENT_SECRET_CHANGE_IT'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            throw new Error('Missing credentials')
          }
        
          if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
            return { 
              id: "1", 
              email: ADMIN_EMAIL, 
              name: "Admin",
              role: "admin"
            }
          }
          console.log('Invalid credentials')
          throw new Error('Invalid credentials')
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Auth error:', errorMessage)
          throw error 
        }
      }
    })
  ],
  secret: SECRET,
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
})

export { handler as GET, handler as POST }
