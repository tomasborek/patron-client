'use client';
import CodeWidget from '@/common/components/widgets/CodeWidget';
import ReservationsWidget from '@/common/components/widgets/ReservationsWidget';
import type { FC } from 'react';

const DashboardHome: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <CodeWidget />
      <ReservationsWidget />
    </div>
  );
};

export default DashboardHome;
