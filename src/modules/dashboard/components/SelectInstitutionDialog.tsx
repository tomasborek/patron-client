import type { FC } from 'react';
import Dialog from '@/common/components/ui/dialog';
import { useGetMe } from '@/common/hooks/api/useGetMe';
import List from '@/common/components/List';
import type { IMeInsitution } from '@/common/interfaces/server/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInstitution } from '@/common/contexts/InstitutionContext';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectInstitutionDialog: FC<Props> = ({ open, setOpen }) => {
  const { me } = useGetMe();
  const { institution, setInstitution } = useInstitution();
  if (!me) return null;
  return (
    <Dialog open={open} setOpen={setOpen} title={'Vyberte instituci'}>
      <div>
        <List
          items={me.institutions}
          render={(items: IMeInsitution[]) =>
            items.map(i => (
              <div
                onClick={() => {
                  setInstitution(i);
                  setOpen(false);
                }}
                key={i.id}
                className={`flex cursor-pointer items-center gap-4 rounded-md p-4 text-gray-600 transition duration-300 hover:bg-gray-100 ${
                  institution?.id === i.id ? 'bg-gray-100' : ' '
                }`}
              >
                <FontAwesomeIcon icon="building" />
                <h3>{i.name}</h3>
                {i.role === 'ADMIN' ? <FontAwesomeIcon icon="crown" /> : null}
              </div>
            ))
          }
        />
      </div>
    </Dialog>
  );
};

export default SelectInstitutionDialog;
