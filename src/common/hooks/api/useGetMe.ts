import { UserService } from '@/lib/services/user.service'
import { useQuery } from 'react-query'
import { useAuth } from '@/common/contexts/AuthContext'

export const useGetMe = () => {
  const { currentUser } = useAuth()
  const userService = new UserService(currentUser?.token)

  const query = useQuery('me', () => userService.getMe(), {
    enabled: !!currentUser?.token,
  })

  return {
    me: query.data?.data.data?.me,
    query,
  }
}
