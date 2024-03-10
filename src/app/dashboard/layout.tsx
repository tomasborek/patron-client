'use client';
import Sidebar from '@/common/components/Sidebar';
import type { FC } from 'react';
import ProtectedRoute from '@/common/components/protectedRoute';

interface Props {
  children: React.ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <title>Dashboard | PatronBox</title>
      <ProtectedRoute>
        <main className="flex min-h-screen">
          <Sidebar />
          <div className="w-full p-12">{children}</div>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default AppLayout;
