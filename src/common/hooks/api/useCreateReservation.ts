import { useMutation } from '@tanstack/react-query';
import { BoxService } from '@/lib/services/box.service';
import { useAuth } from '@/common/contexts/AuthContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useCreateReservation = () => {
  const { token } = useAuth();
  const boxService = new BoxService(token);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (boxId: string) => boxService.createReservation(boxId),
    onSuccess: () => {
      toast.success('Rezervace vytvořena');
      router.push('/dashboard');
    },
    onError: () => {
      toast.error('Něco se pokazilo');
    },
  });

  return {
    createReservation: mutation.mutate,
    mutation: mutation,
  };
};
