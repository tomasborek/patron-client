'use client';
import List from '@/common/components/List';
import LogItem from '@/common/components/widgets/LogItem';
import Pagination from '@/common/components/widgets/Pagination';
import { useAuth } from '@/common/contexts/AuthContext';
import { useInstitution } from '@/common/contexts/InstitutionContext';
import { useGetLogs } from '@/common/hooks/api/useGetLogs';
import { useGetMe } from '@/common/hooks/api/useGetMe';
import { ILogFilters } from '@/common/interfaces/client';
import { ILogDTO } from '@/common/interfaces/server/log';
import DashboardWrapper from '@/modules/dashboard/components/DashboardWrapper';
import LogFilters from '@/modules/dashboard/logs/components/LogFilters';
import { useState, type FC, useEffect } from 'react';

const LogsPage = () => {
  const { institution } = useInstitution();
  const { me } = useGetMe();
  const [filters, setFilter] = useState<ILogFilters>({
    institution: null,
    user: null,
    page: 1,
  });
  const { logs, count } = useGetLogs({
    userId: filters?.user?.id,
    institutionId: filters?.institution?.id,
    page: filters.page,
  });

  const setPage = (page: number) => setFilter({ ...filters, page });

  useEffect(() => {
    if (me?.role === 'DEVELOPER') {
      setFilter({ institution: null, user: null, page: 1 });
    }
    if (institution?.role === 'ADMIN') {
      setFilter({ institution: institution, user: null, page: 1 });
    }
    if (institution?.role === 'USER' && me?.role === 'USER') {
      setFilter({
        institution: { id: institution.id, name: institution.name },
        user: { id: me.id, email: me.email },
        page: 1,
      });
    }
  }, [me, institution]);
  return (
    <DashboardWrapper title="Logy">
      <LogFilters
        filters={[
          { title: filters.institution?.name },
          { title: filters.user?.email },
        ]}
      />
      <List
        items={logs}
        className="flex flex-col gap-4"
        render={(logs: ILogDTO[]) =>
          logs.map(log => <LogItem key={log.id} log={log} />)
        }
      />
      {logs?.length ? (
        <Pagination total={count} page={filters.page} setPage={setPage} />
      ) : null}
    </DashboardWrapper>
  );
};

export default LogsPage;
