import type { FC } from 'react';
import { useGetReservations } from '../../hooks/api/useGetReservations';
import List from '../List';
import type { IUserReservationDTO } from '../../interfaces/server/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../ui/button';

const Reservations: FC = () => {
  const { reservations } = useGetReservations();
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-md">
      <header className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">Rezervace</h3>
        <Button className="flex items-center gap-4">
          <FontAwesomeIcon icon={'plus'} /> Vytvořit
        </Button>
      </header>
      <List
        className="flex flex-col gap-4"
        noContentMessage="Nemáte žádné rezervace"
        items={reservations}
        render={(items: IUserReservationDTO[]) =>
          items.map(i => <div key={i.id}>AHOJ</div>)
        }
      ></List>
    </div>
  );
};

export default Reservations;
