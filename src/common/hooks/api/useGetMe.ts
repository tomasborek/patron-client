import { UserService } from '@/lib/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';

export const useGetMe = () => {
  const { token } = useAuth();
  const userService = new UserService(token);

  const query = useQuery({
    queryKey: ['me'],
    queryFn: () => userService.getMe(),
    enabled: !!token,
  });

  return {
    me: query.data?.data.data?.me,
    query,
  };
};
