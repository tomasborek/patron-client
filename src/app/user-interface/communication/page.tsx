'use client';
import Connected from '@/modules/user-interface/components/Connected';
import Link from 'next/link';
import { type FC } from 'react';

const CommunicationPage: FC = () => {
  return (
    <Connected>
      <div className="flex h-full flex-col justify-stretch gap-4 text-4xl">
        <Link href="/user-interface/communication/borrow" className="flex-1">
          <button className="text-text h-full w-full rounded-md border border-gray-400 bg-gray-200 font-bold">
            Chci si půjčit
          </button>
        </Link>
        <Link href="/user-interface/communication/return" className="flex-1">
          <button className="text-text h-full w-full rounded-md border border-gray-400 bg-gray-200 font-bold">
            Chci vrátit
          </button>
        </Link>
      </div>
    </Connected>
  );
};

export default CommunicationPage;
