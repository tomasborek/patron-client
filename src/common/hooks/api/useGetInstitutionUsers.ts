import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { InstitutionService } from '@/lib/services/institution.service';

export const useGetInstitutionUsers = (
  institutionId: string,
  page?: number,
) => {
  const { token } = useAuth();
  const institutionService = new InstitutionService(token);

  const query = useQuery({
    queryKey: ['institutionUsers', institutionId],
    queryFn: () => institutionService.getUsers(institutionId, page),
    enabled: !!institutionId && !!token,
  });

  return {
    users: query.data?.data?.data?.users,
    count: query.data?.data?.data?.count,
    query,
  };
};
