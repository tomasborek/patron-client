import { useQuery } from 'react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { UserService } from '@/lib/services/user.service';

export const useGetReservations = () => {
  const { currentUser } = useAuth();
  const userService = new UserService(currentUser?.token);
  const query = useQuery(
    ['reservations'],
    () => userService.getReservations(),
    { enabled: !!currentUser },
  );
  return {
    reservations: query.data?.data?.data?.reservations,
    query,
  };
};
