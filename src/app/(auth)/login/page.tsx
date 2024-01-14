'use client';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/common/hooks/api/useLogin';
import { Input } from '@/common/components/ui/input';
import { Button } from '@/common/components/ui/button';
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
  const { login, query } = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="font-bold">Přihlášení</h2>
      <Form {...form}>
        <form
          className="flex w-full flex-col items-center gap-4"
          onSubmit={form.handleSubmit(data => {
            login(data);
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Jan Nový" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Heslo</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Vaše heslo..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {query.isLoading ? (
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
      </Form>
    </div>
  );
};

export default LoginPage;
