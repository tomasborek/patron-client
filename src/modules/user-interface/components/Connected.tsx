import { useInterface } from '@/common/contexts/InterfaceContext';
import { useEffect, type FC } from 'react';
import { useRouter } from 'next/navigation';
interface IProps {
  children: React.ReactNode;
}
const Connected: FC<IProps> = ({ children }) => {
  const router = useRouter();
  const { connected } = useInterface();
  useEffect(() => {
    if (!connected) router.push('/user-interface/enter');
  }, [connected]);
  if (!connected) return null;
  return children;
};

export default Connected;
