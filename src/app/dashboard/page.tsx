'use client';
import Button from '@/common/components/ui/button';
import CodeWidget from '@/common/components/widgets/CodeWidget';
import ReservationsWidget from '@/common/components/widgets/ReservationsWidget';
import DashboardWrapper from '@/modules/dashboard/components/DashboardWrapper';
import type { FC } from 'react';

const DashboardHome: FC = () => {
  return (
    <DashboardWrapper title="Domov">
      <CodeWidget />
      <ReservationsWidget />
    </DashboardWrapper>
  );
};

export default DashboardHome;
