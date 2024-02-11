'use client';
import { InterfaceProvider } from '@/common/contexts/InterfaceContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC } from 'react';
import { useRouter } from 'next/navigation';
interface IProps {
  children: React.ReactNode;
}

const InterfaceLayout: FC<IProps> = ({ children }) => {
  const router = useRouter();
  return (
    <InterfaceProvider>
      <div className="flex h-screen flex-col p-4">
        <div className="flex justify-start">
          <div
            onClick={() => router.push('/user-interface/communication/')}
            className="action text-xl"
          >
            <FontAwesomeIcon icon="chevron-left" />
          </div>
        </div>
        <header className="mb-12 mt-12 flex justify-center">
          <img src="/img/logo/logo.svg" alt="logo" className="w-[40px]" />
        </header>
        {children}
      </div>
    </InterfaceProvider>
  );
};

export default InterfaceLayout;
