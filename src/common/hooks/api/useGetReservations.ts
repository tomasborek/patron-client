import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { UserService } from '@/lib/services/user.service';

export const useGetReservations = () => {
  const { token } = useAuth();
  const userService = new UserService(token);

  const query = useQuery({
    queryKey: ['reservations'],
    queryFn: () => userService.getReservations(),
    enabled: !!token,
  });

  return {
    reservations: query.data?.data?.data?.reservations,
    query,
  };
};
