import { useGetMe } from '@/common/hooks/api/useGetMe';
import { IInstitutionUserDTO } from '@/common/interfaces/server/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useState, type FC } from 'react';

interface IProps {
  user: IInstitutionUserDTO;
}

const ROLE = {
  USER: 'Uživatel',
  ADMIN: 'Admin',
};

const UserItem: FC<IProps> = ({ user }) => {
  const { me } = useGetMe();
  const [open, setOpen] = useState<boolean>(false);
  return (
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
        <div>
          <FontAwesomeIcon icon="chevron-down" />
        </div>
      </div>
      <div
        className={`${
          open ? 'max-h-[600px]' : 'max-h-0'
        } z-20 w-full overflow-hidden transition-all duration-300`}
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
  );
};

export default UserItem;
