'use client';
import Button from '@/common/components/ui/button';
import { useInterface } from '@/common/contexts/InterfaceContext';
import Code from '@/modules/user-interface/components/Code';
import Connected from '@/modules/user-interface/components/Connected';
import { useState, type FC, useEffect } from 'react';

const ReservationPage: FC = () => {
  const [code, setCode] = useState<string>('');
  const { processReservation } = useInterface();
  return (
    <Connected>
      <div className="container">
        <Code code={code} setCode={setCode} />
        <div onClick={() => processReservation(code)} className="mt-8">
          <Button className="w-full p-8 text-2xl">Vyřídit rezervaci</Button>
        </div>
      </div>
    </Connected>
  );
};

export default ReservationPage;
