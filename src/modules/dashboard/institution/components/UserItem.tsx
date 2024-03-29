import Button from '@/common/components/ui/button';
import Dialog from '@/common/components/ui/dialog';
import { Popover, PopoverTrigger } from '@/common/components/ui/popover';
import { useInstitution } from '@/common/contexts/InstitutionContext';
import { useGetMe } from '@/common/hooks/api/useGetMe';
import { useRemoveUser } from '@/common/hooks/api/useRemoveUser';
import { IInstitutionUserDTO } from '@/common/interfaces/server/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PopoverContent } from '@radix-ui/react-popover';
import moment from 'moment';
import { useState, type FC, useEffect } from 'react';
import { set } from 'react-hook-form';

interface IProps {
  user: IInstitutionUserDTO;
}

const ROLE = {
  USER: 'Uživatel',
  ADMIN: 'Admin',
};

const UserItem: FC<IProps> = ({ user }) => {
  const { me } = useGetMe();
  const { institution } = useInstitution();
  const [open, setOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [confirmDeleteUserDialogOpen, setConfirmDeleteUserDialogOpen] =
    useState<boolean>(false);
  const { removeUser, mutation } = useRemoveUser();
  useEffect(() => {
    if (mutation.isSuccess) {
      setConfirmDeleteUserDialogOpen(false);
      setUserToDelete(null);
    }
  }, [mutation.isSuccess]);
  return (
    <>
      <Dialog
        title="Opravdu chcete odebrat uživatele z instituce?"
        open={confirmDeleteUserDialogOpen}
        setOpen={setConfirmDeleteUserDialogOpen}
      >
        <div className="flex items-center gap-4">
          <Button
            loading={mutation.isPending}
            onClick={() => {
              if (!userToDelete || !institution) {
                setConfirmDeleteUserDialogOpen(false);
                setUserToDelete(null);
                return;
              }
              removeUser({
                userId: userToDelete,
                institutionId: institution.id,
              });
            }}
            variant="primary"
          >
            Odebrat
          </Button>
          <Button
            onClick={() => {
              setConfirmDeleteUserDialogOpen(false);
              setUserToDelete(null);
            }}
            variant="neutral"
          >
            Zrušit
          </Button>
        </div>
      </Dialog>
      <div className="relative z-10">
        <div
          onClick={() => setOpen(prev => !prev)}
          className={`z-10 flex cursor-pointer items-center justify-between gap-4 rounded-md bg-gray-100 p-4 ${
            me?.id === user.id ? 'border border-primary' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600">
              <FontAwesomeIcon icon="user" />
            </div>
            <div className="text-gray-600">
              <p className="text-sm">{user.name ?? 'Bez jména'}</p>
              <p>
                {user.email} - {ROLE[user.institutionRole]}
              </p>
            </div>
          </div>
          <div
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-4"
          >
            <Popover>
              <PopoverTrigger>
                <div className="rounded-md p-4 transition-all hover:bg-gray-200 ">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="rounded-md bg-white shadow-md">
                <ul className="p-2">
                  <li
                    onClick={() => {
                      setUserToDelete(user.id);
                      setConfirmDeleteUserDialogOpen(true);
                    }}
                    className="flex items-center gap-4 rounded-md p-4 text-red-700 hover:bg-gray-100"
                  >
                    <FontAwesomeIcon icon="trash" />
                    Odebrat z instituce
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
            <FontAwesomeIcon icon="chevron-down" />
          </div>
        </div>
        <div
          className={`${
            open ? 'max-h-[600px]' : 'max-h-0'
          } z-20 w-full overflow-hidden transition-all duration-500 ease-in-out`}
        >
          <div className="rounded-b-md border-t border-gray-200 bg-gray-100 p-4 text-gray-600">
            <h2 className="font-bold">{user.email}</h2>
            <div>
              <p>
                Účet založen:{' '}
                {moment(user.createdAt).format('DD.MM.YYYY HH:mm:ss')}
              </p>
              <p>Aktivován: {user.active ? 'Ano' : 'Ne'}</p>
              <p>E-mail ověřen: {user.verified ? 'Ano' : 'Ne'}</p>
              <p>Id uživatele: {user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;
