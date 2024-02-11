import { ILogDTO } from '@/common/interfaces/server/log';
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
    <div className="w-full rounded-md bg-gray-200 p-4 text-gray-600">
      <p className="font-bold">{logAction[log.action]}</p>
      <p>{log.user?.email ?? 'Neznámý uživatel'}</p>
    </div>
  );
};

export default LogItem;
