import { ILogDTO } from '@/common/interfaces/server/log';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { type FC } from 'react';
interface IProps {
  log: ILogDTO;
}

const logAction = {
  RESERVATIONCREATE: 'Vytvoření rezervace',
  RESERVATIONCANCEL: 'Zrůšení rezervace',
  BORROW: 'Půjčení obsahu',
  RETURN: 'Vrácení půjčeného obsahu',
  PHOTO: 'Fotka',
  ADD: 'Uživatel přidán do instituce',
  REMOVE: 'Uživatel odebrán z instituce',
  DISABLECODE: 'Deaktivace kódu',
  ACTIVATE: 'Uživatel aktivován',
};

const LogItem: FC<IProps> = ({ log }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-gray-100 p-4 text-gray-600">
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon="clock" />
        <div>
          <p>{log.user?.email ?? 'Neznámý uživatel'}</p>
          <div className="flex items-center gap-2">
            <p className="font-bold">{logAction[log.action]}</p>
            <p className="text-sm text-gray-400">
              {log.institution ? `Instituce ${log.institution.name}` : null}
              {log.institution && (log.station ?? log.box) ? ' - ' : null}
              {log.station ? `Stanice ${log.station.name}` : null}
              {log.station && log.box ? ' - ' : null}
              {log.box ? `Box ${log.box.localId}` : null}
            </p>
          </div>
        </div>
      </div>
      <p>{moment(log.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
    </div>
  );
};

export default LogItem;
