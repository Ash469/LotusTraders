'use client';

import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';
import { signOut, useSession } from 'next-auth/react';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

interface AdminNavBarProps {
  onMenuToggle?: () => void;
  children?: React.ReactNode;
}

const AdminNavBar = ({ onMenuToggle, children }: AdminNavBarProps) => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full bg-theme-bg/90 backdrop-blur-md text-theme-text shadow-sm border-b border-theme-border z-50 transition-colors duration-300">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {onMenuToggle && (
            <button 
              className="lg:hidden p-2 hover:bg-theme-surface rounded-[8px] transition-colors"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              <FaBars className="h-5 w-5 text-theme-text" />
            </button>
          )}
          
          <div className="relative h-12 w-[150px] md:h-14 md:w-[180px]">
            <Link href="/admin/dashboard" passHref>
              <Image 
                src="/logo.png" 
                alt="Lotus Traders Machinery Logo" 
                fill 
                priority 
                className="object-contain object-left"
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {children && (
            <div className="mr-2 sm:mr-4">
              {children}
            </div>
          )}
          
          <div className="hidden sm:block text-sm text-theme-text-muted mr-2">
            {session?.user?.email && <span className="font-medium">{session.user.email}</span>}
          </div>
          
          <ThemeToggle />
          
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide rounded-[8px] transition-all bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-md"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
          
          {/* Mobile sign out button (icon only) */}
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="sm:hidden p-2.5 rounded-[8px] text-red-600 hover:bg-red-600/10 transition-colors"
            aria-label="Sign out"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
