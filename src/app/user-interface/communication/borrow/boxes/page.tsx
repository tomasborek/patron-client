'use client';
import Button from '@/common/components/ui/button';
import { BoxSelect } from '@/common/components/widgets/BoxSelect';
import { useInterface } from '@/common/contexts/InterfaceContext';
import { IBoxDTO } from '@/common/interfaces/server/box';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import Code from '@/modules/user-interface/components/Code';

const BoxesPage: FC = () => {
  const [selectedBox, setSelectedBox] = useState<IBoxDTO | null>(null);
  const [code, setCode] = useState<string>('');
  const [view, setView] = useState<'boxes' | 'code'>('boxes');
  const { boxes, processBorrow } = useInterface();
  if (view === 'code')
    return (
      <div className="container">
        <Code code={code} setCode={setCode} />
        <div
          onClick={() => processBorrow(code, selectedBox!.id)}
          className="mt-8"
        >
          <Button className="w-full p-8 text-2xl">Půjčit</Button>
        </div>
      </div>
    );
  return (
    <div className="container">
      <BoxSelect
        boxes={boxes}
        selectedBox={selectedBox}
        setSelectedBox={setSelectedBox}
      />
      <div className="mt-8">
        <Button
          disabled={!selectedBox}
          onClick={() => {
            if (!selectedBox) return;
            setView('code');
          }}
          className="w-full p-8 text-xl"
        >
          Pokračovat
        </Button>
      </div>
    </div>
  );
};

export default BoxesPage;
