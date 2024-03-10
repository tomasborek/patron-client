'use client';
import { useAuth } from '@/common/contexts/AuthContext';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser) {
    router.push('/dashboard');
    return null;
  }
  return (
    <main className="mt-12 flex h-screen flex-col items-center">
      <img src="/img/logo/logo.svg" className="mb-12 w-[50px]" alt="logo" />
      <div className="mx-auto flex w-full max-w-[500px] items-stretch rounded-md bg-white p-8 shadow-md">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
