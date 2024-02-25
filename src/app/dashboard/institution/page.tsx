'use client';
import List from '@/common/components/List';
import Button from '@/common/components/ui/button';
import Pagination from '@/common/components/widgets/Pagination';
import { useInstitution } from '@/common/contexts/InstitutionContext';
import { useGetInstitutionUsers } from '@/common/hooks/api/useGetInstitutionUsers';
import { IInstitutionUserDTO } from '@/common/interfaces/server/user';
import DashboardWrapper from '@/modules/dashboard/components/DashboardWrapper';
import AddUserDialog from '@/modules/dashboard/institution/components/AddUserDialog';
import UserItem from '@/modules/dashboard/institution/components/UserItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, type FC } from 'react';

const InstitutionPage: FC = () => {
  const { institution } = useInstitution();
  const [page, setPage] = useState<number>(1);
  const { users, count } = useGetInstitutionUsers(institution?.id ?? '', page);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <AddUserDialog
        open={open}
        setOpen={setOpen}
        institutionId={institution?.id ?? ''}
        institutionName={institution?.name ?? ''}
      />
      <DashboardWrapper title={institution?.name ?? ''}>
        <Button onClick={() => setOpen(true)} variant="black" className="w-max">
          <FontAwesomeIcon icon="plus" />
          Přidat uživatele
        </Button>
        <List
          className="flex flex-col gap-4"
          items={users}
          render={(items: IInstitutionUserDTO[]) =>
            items.map(u => <UserItem key={u.id} user={u} />)
          }
        />
        <Pagination total={count} page={page} setPage={setPage} />
      </DashboardWrapper>
    </>
  );
};

export default InstitutionPage;
