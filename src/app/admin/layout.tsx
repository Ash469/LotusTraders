import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Lotus',
  description: 'Admin management interface for Lotus products and categories',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
