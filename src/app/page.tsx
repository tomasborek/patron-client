'use client';
import ProtectedRoute from '@/common/components/protectedRoute';

const HomePage = () => {
  return <ProtectedRoute redirect />;
};

export default HomePage;
