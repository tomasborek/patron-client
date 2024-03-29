import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { InstitutionService } from '@/lib/services/institution.service';
import toast from 'react-hot-toast';

export const useRemoveUser = () => {
  const { token } = useAuth();
  const institutionService = new InstitutionService(token);
  const mutation = useMutation({
    mutationFn: (data: { userId: string; institutionId: string }) => {
      return institutionService.removeUser(data.institutionId, data.userId);
    },
    onSuccess: () => {
      toast.success('Uživatel byl odebrán z instituce');
    },
    onError: () => {
      toast.error('Nepodařilo se odebrat uživatele z instituce');
    },
  });

  return {
    removeUser: mutation.mutate,
    mutation,
  };
};
