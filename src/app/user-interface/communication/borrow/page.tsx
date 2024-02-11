'use client';
import Connected from '@/modules/user-interface/components/Connected';
import Link from 'next/link';
import { type FC } from 'react';

const BorrowPage: FC = () => {
  return (
    <Connected>
      <div className="flex h-full flex-col justify-stretch gap-4 text-4xl">
        <Link
          href="/user-interface/communication/borrow/reservation"
          className="flex-1"
        >
          <button className="text-text h-full w-full rounded-md border border-gray-400 bg-gray-200 font-bold">
            Mám rezervaci
          </button>
        </Link>
        <Link
          href="/user-interface/communication/borrow/boxes"
          className="flex-1"
        >
          <button className="text-text h-full w-full rounded-md border border-gray-400 bg-gray-200 font-bold">
            Nemám rezervaci
          </button>
        </Link>
      </div>
    </Connected>
  );
};

export default BorrowPage;
