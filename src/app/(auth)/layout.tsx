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
    <main className="mt-4 flex h-screen flex-col items-center md:mt-12">
      <img
        src="/img/logo/logo.svg"
        className="mb-4 w-[30px] md:mb-12 md:w-[50px]"
        alt="logo"
      />
      <div className="mx-auto w-full max-w-[500px] px-4">
        <div className="flex w-full  items-stretch rounded-md bg-white p-8 shadow-md">
          {children}
        </div>
      </div>
      <div className="mt-12 w-full border-t border-gray-200 p-4 text-center text-gray-400">
        @{new Date().getFullYear()} PatronBox
      </div>
    </main>
  );
};

export default AuthLayout;
