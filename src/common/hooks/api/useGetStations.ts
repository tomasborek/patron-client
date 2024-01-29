import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { InstitutionService } from '@/lib/services/institution.service';

export const useGetStations = (institutionId?: string) => {
  const { token } = useAuth();
  const institutionService = new InstitutionService(token);

  const query = useQuery({
    queryKey: ['stations', institutionId],
    queryFn: () => institutionService.getStations(institutionId ?? ''),
    enabled: !!institutionId && !!token,
  });

  return {
    stations: query.data?.data.data?.stations ?? [],
    query,
  };
};
