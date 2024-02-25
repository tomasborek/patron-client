import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import toast from 'react-hot-toast';
import { IAddUserDTO } from '@/common/interfaces/server/institution';
import { InstitutionService } from '@/lib/services/institution.service';

export const useAddUser = () => {
  const { token } = useAuth();
  const institutionService = new InstitutionService(token);

  const mutation = useMutation({
    mutationFn: (data: { institutionId: string; data: IAddUserDTO }) =>
      institutionService.addUser(data.institutionId, data.data),
    onError: () => {
      toast.error('Něco se pokazilo');
    },
    onSettled: () => {
      toast.success('Uživateli přijde pozvánka na email');
    },
  });

  return {
    addUser: mutation.mutate,
    mutation,
  };
};
