import { useMutation } from '@tanstack/react-query';
import { UserService } from '@/lib/services/user.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { IVerifyDTO } from '@/common/interfaces/server/user';

export const useVerify = () => {
  const userService = new UserService();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ tokenId, data }: { tokenId: string; data: IVerifyDTO }) =>
      userService.verify(tokenId, data),
    onSuccess: () => {
      toast.success('Conta ativada com sucesso!');
      router.push(`/login`);
    },
    onError: () => {
      toast.error('Não foi possível ativar a conta.');
    },
  });

  return {
    verify: mutation.mutate,
    mutation,
  };
};
