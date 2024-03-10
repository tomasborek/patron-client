'use client';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Input from '@/common/components/ui/input';
import Button from '@/common/components/ui/button';
import InputItem from '@/common/components/ui/inputItem';
import { useActivate } from '@/common/hooks/api/useActivate';
const formSchema = z
  .object({
    name: z
      .string({ required_error: 'Zadejte prosím jméno' })
      .min(1)
      .max(255, { message: 'Jméno musí mít méně než 255 znaků' }),
    email: z.string().email({ message: 'Zadejte validní email' }),
    password: z
      .string()
      .min(8, { message: 'Heslo musí být delší než 8 znaků' })
      .max(255, { message: 'Heslo musí být kratší než 255 znaků' }),
    'password-again': z
      .string()
      .min(8, { message: 'Hesla se neshodují' })
      .max(255, { message: 'Hesla se neshodují' }),
  })
  .strict()
  .refine(data => data.password === data['password-again'], {
    message: 'Hesla se neshodují',
    path: ['password-again'],
  });

const LoginPage: FC = () => {
  const { activate, mutation } = useActivate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <>
      <title>Aktivace účtu | PatronBox</title>
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-center text-xl font-bold text-gray-600">
          Aktivace účtu
        </h2>
        <p className="text-center text-sm text-gray-400">
          Vítejte v Patronu! Byli jste pozváni do instituce a zbývá vám již si
          pouze aktivovat účet a ověřit si e-mail a poté můžete využívat Patron
          naplno!
        </p>
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit(data => {
            activate({
              email: data.email,
              password: data.password,
              name: data.name,
            });
          })}
        >
          <InputItem label="Jméno" error={errors.name?.message}>
            <Input placeholder="Jan Nový" {...register('name')} />
          </InputItem>
          <InputItem label="E-mail" error={errors.email?.message}>
            <Input placeholder="vas@email.cz" {...register('email')} />
          </InputItem>
          <InputItem label="Heslo" error={errors.password?.message}>
            <Input
              placeholder="Bezpečné heslo"
              type="password"
              {...register('password')}
            />
          </InputItem>
          <InputItem
            label="Heslo znovu"
            error={errors['password-again']?.message}
          >
            <Input
              placeholder="Heslo pro kontrolu"
              type="password"
              {...register('password-again')}
            />
          </InputItem>
          {mutation.isPending ? (
            <Button variant={'primary'} disabled>
              <Loader2 />
              Pracujeme na tom
            </Button>
          ) : (
            <Button variant={'primary'} type="submit">
              Přihlásit se
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
