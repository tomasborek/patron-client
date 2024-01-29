import { useState, type FC } from 'react';
import { useGetReservations } from '../../hooks/api/useGetReservations';
import List from '../List';
import type { IUserReservationDTO } from '../../interfaces/server/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../ui/button';
import moment from 'moment';
import Link from 'next/link';
import ConfirmCancelDialog from './ConfirmCancelDialog';

const Reservations: FC = () => {
  const { reservations } = useGetReservations();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [cancelledId, setCancelledId] = useState<string>('');
  return (
    <>
      <ConfirmCancelDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        reservationId={cancelledId}
      />
      <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-md">
        <header className="flex items-center justify-between">
          <h3 className="font-bold text-gray-600">Rezervace</h3>
          <Link href="/dashboard/reservation">
            <Button small variant="black">
              <FontAwesomeIcon icon={'plus'} /> Vytvořit
            </Button>
          </Link>
        </header>
        <List
          className="flex flex-col gap-4"
          noContentMessage="Nemáte žádné rezervace"
          items={reservations}
          render={(items: IUserReservationDTO[]) =>
            items.map(i => (
              <div
                key={i.id}
                className="flex items-center justify-between rounded-md bg-gray-100 p-4 text-gray-600"
              >
                <div className="flex items-center gap-4">
                  <h3 className="font-bold">
                    {i.institution.name}, {i.station.name} Box{' '}
                    {i.station.box.localId}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FontAwesomeIcon icon="clock" />
                    <p>
                      Zbývá{' '}
                      {moment(i.createdAt).add(24, 'h').diff(moment(), 'h')}{' '}
                      hodin
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setCancelledId(i.id);
                    setConfirmOpen(true);
                  }}
                  variant="ghost"
                  small
                >
                  <p className="text-red-500">Zrušit</p>
                </Button>
              </div>
            ))
          }
        ></List>
      </div>
    </>
  );
};

export default Reservations;
