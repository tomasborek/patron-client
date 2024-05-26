'use client';
import Button from '@/common/components/ui/button';
import Input from '@/common/components/ui/input';
import InputItem from '@/common/components/ui/inputItem';
import { useInterface } from '@/common/contexts/InterfaceContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const schema = z
  .object({
    stationId: z.string(),
    password: z.string(),
  })
  .strict();

const EntryInterfacePage: FC = () => {
  const { handleSubmit, register } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { connect, connecting } = useInterface();
  return (
    <form
      className="rounde-md container flex flex-col gap-4 bg-white p-4 shadow-md"
      onSubmit={handleSubmit(data => {
        connect(data.stationId, data.password);
      })}
    >
      <InputItem label="StationId">
        <Input type="text" {...register('stationId')} />
      </InputItem>
      <InputItem label="Heslo">
        <Input type="password" {...register('password')} />
      </InputItem>
      <Button loading={connecting}>Vstoupit</Button>
    </form>
  );
};

export default EntryInterfacePage;
