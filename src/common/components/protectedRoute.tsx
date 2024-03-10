import { type FC } from 'react';
import { useGetMe } from '../hooks/api/useGetMe';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface IProps {
  children?: React.ReactNode;
  redirect?: boolean;
}

const ProtectedRoute: FC<IProps> = ({ children, redirect }) => {
  const { me } = useGetMe();
  const { currentUser } = useAuth();
  const router = useRouter();

  if (currentUser === null) {
    router.push('/login');
    return null;
  }
  if (currentUser === undefined) return <LoadingPage />;
  if (!me) return <LoadingPage />;
  if (redirect && currentUser) router.push('/dashboard');
  return children;
};

const LoadingPage: FC = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <img className="w-[80px]" src="/img/logo/logo.svg" alt="loading logo" />
    </main>
  );
};

export default ProtectedRoute;
