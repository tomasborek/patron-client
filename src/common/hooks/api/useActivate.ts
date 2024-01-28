import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/lib/services/user.service';
import { IActivateDTO } from '@/common/interfaces/server/user';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useActivate = () => {
  const userService = new UserService();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: IActivateDTO) => userService.activate(data),
    onSuccess: data => {
      toast.success('Conta ativada com sucesso!');
      router.push(`/activate/verify?id=${data.data.data?.tokenId}`);
    },
    onError: () => {
      toast.error('Não foi possível ativar a conta.');
    },
  });

  return {
    activate: mutation.mutate,
    mutation,
  };
};
