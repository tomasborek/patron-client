'use client';
import { Button } from '@/common/components/ui/button';
import Input from '@/common/components/ui/input';
import InputItem from '@/common/components/ui/inputItem';
import { type FC } from 'react';
import { useVerify } from '@/common/hooks/api/useVerify';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const VerifyPage: FC = () => {
  const { verify, mutation } = useVerify();
  const params = useSearchParams();
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        verify({
          tokenId: params.get('id') as string,
          data: { code: parseInt(formData.get('code') as string) },
        });
      }}
      className="flex w-full flex-col gap-4"
    >
      <InputItem label="6-ti místný kód z e-mailu">
        <Input placeholder="xxx-xxx" name="code" />
      </InputItem>
      {mutation.isPending ? (
        <Button variant={'primary'} disabled>
          <Loader2 />
          Pracujeme na tom
        </Button>
      ) : (
        <Button variant={'primary'}>Ověřit a dokončit</Button>
      )}
    </form>
  );
};

export default VerifyPage;
