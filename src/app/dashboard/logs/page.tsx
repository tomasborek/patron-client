'use client';
import List from '@/common/components/List';
import LogItem from '@/common/components/widgets/LogItem';
import { useAuth } from '@/common/contexts/AuthContext';
import { useGetLogs } from '@/common/hooks/api/useGetLogs';
import { ILogDTO } from '@/common/interfaces/server/log';
import DashboardWrapper from '@/modules/dashboard/components/DashboardWrapper';
import { type FC } from 'react';

const LogsPage = () => {
  const { currentUser } = useAuth();
  const { logs } = useGetLogs({ userId: currentUser?.id });
  return (
    <DashboardWrapper title="Logy">
      <List
        items={logs}
        className="flex flex-col gap-4"
        render={(logs: ILogDTO[]) =>
          logs.map(log => <LogItem key={log.id} log={log} />)
        }
      />
    </DashboardWrapper>
  );
};

export default LogsPage;
