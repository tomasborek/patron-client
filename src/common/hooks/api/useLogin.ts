import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/lib/services/user.service';
import { useAuth } from '@/common/contexts/AuthContext';
import toast from 'react-hot-toast';
import { ILoginDTO } from '@/common/interfaces/server/user';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const userService = new UserService();
  const { login } = useAuth();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: ILoginDTO) => userService.auth(data),
    onSuccess: data => {
      login(data.data.data?.token as string);
      toast.success('Přihlášení proběhlo úspěšně');
      router.push('/dashboard');
    },
    onError: () => {
      toast.error('Něco se pokazilo');
    },
  });

  return {
    login: mutation.mutate,
    mutation: mutation,
  };
};
