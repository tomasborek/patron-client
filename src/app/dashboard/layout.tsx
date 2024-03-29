'use client';
import Sidebar from '@/common/components/Sidebar';
import type { FC } from 'react';
import ProtectedRoute from '@/common/components/protectedRoute';
import BottomPanel from '@/common/components/BottomPanel';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <title>Dashboard | PatronBox</title>
      <ProtectedRoute>
        <header className="block border-b border-gray-200 p-4 md:hidden">
          <Link href={'/dashboard'} className="flex items-center gap-4">
            <img className="w-[20px]" src="/img/logo/logo.svg" alt="" />
            <h2 className="text-lg font-bold text-gray-600">Patronbox</h2>
          </Link>
        </header>
        <main className="flex min-h-screen">
          <Sidebar />
          <BottomPanel />
          <div className="w-full p-4 py-8 md:p-12">{children}</div>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default AppLayout;
