'use client';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/common/hooks/api/useLogin';
import Button from '@/common/components/ui/button';
import InputItem from '@/common/components/ui/inputItem';
import Input from '@/common/components/ui/input';
const formSchema = z
  .object({
    email: z.string().email({ message: 'Zadejte validní email' }),
    password: z
      .string()
      .min(8, { message: 'Heslo musí být delší než 8 znaků' })
      .max(255, { message: 'Heslo musí být kratší než 255 znaků' }),
  })
  .strict();

const LoginPage: FC = () => {
  const { login, mutation } = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <>
      <title>Přihlášení | PatronBox</title>
      <div className="flex w-full flex-col gap-4">
        <h2 className="font-bold">Přihlášení</h2>
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={handleSubmit(data => {
            login(data);
          })}
        >
          <InputItem label="E-mail" error={errors.email?.message}>
            <Input placeholder="E-mail" {...register('email')} />
          </InputItem>
          <InputItem label="Heslo" error={errors.password?.message}>
            <Input
              placeholder="Heslo"
              type="password"
              {...register('password')}
            />
          </InputItem>

          <Button loading={mutation.isPending}>Přihlásit se</Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
