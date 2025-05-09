'use client'

import {  useEffect, Suspense } from 'react'
import {  useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoginForm from './components/LoginForm'

export default function AdminLogin() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (status === 'authenticated') {
      router.push('/admin/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="relative h-14 w-44">
            <Image src="/logo.png" alt="Lotus Logo" fill priority className="object-contain" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Admin Login</h1>
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
