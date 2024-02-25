import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import LogService from '@/lib/services/log.service';
import { ILogQuery } from '@/common/interfaces/server/log';
export const useGetLogs = (data: ILogQuery) => {
  const { token } = useAuth();
  const logService = new LogService(token);

  const query = useQuery({
    queryKey: ['logs', data],
    queryFn: () => logService.get(data),
    enabled: !!token,
  });

  return {
    logs: query.data?.data?.data?.logs,
    count: query.data?.data?.data?.count,
    query,
  };
};
