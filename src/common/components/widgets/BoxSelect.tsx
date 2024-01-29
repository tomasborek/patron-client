import { type FC } from 'react';
import List from '../List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBoxDTO } from '@/common/interfaces/server/box';

interface IProps {
  boxes: IBoxDTO[];
  selectedBox: IBoxDTO | null;
  setSelectedBox: React.Dispatch<React.SetStateAction<IBoxDTO | null>>;
}

const boxStateStyles = {
  DEFAULT: 'bg-green-500 hover:bg-green-600 text-white cursor-pointer',
  EMPTY: 'bg-gray-200 cursor-disabled pointer-events-none text-text',
  OPEN: 'bg-blue-500 text-white cursor-disabled pointer-events-none',
  RESERVED: 'bg-yellow-500 text-white cursor-disabled pointer-events-none',
  DISABLED: 'bg-red-500 text-white cursor-disabled pointer-events-none',
};

export const BoxSelect: FC<IProps> = ({
  boxes,
  selectedBox,
  setSelectedBox,
}) => {
  return (
    <List
      className="grid grid-cols-2 gap-2 md:grid-cols-4"
      items={boxes}
      render={(items: IBoxDTO[]) =>
        items.map(b => (
          <div
            onClick={() => (b.state === 'DEFAULT' ? setSelectedBox(b) : null)}
            className={`flex items-center justify-between rounded-md p-4 font-bold transition ${
              boxStateStyles[b.reserved ? 'RESERVED' : b.state]
            }`}
          >
            <h3 className="text-lg font-bold">{b.localId}</h3>
            {b.id === selectedBox?.id ? (
              <FontAwesomeIcon className="text-sm" icon={'check'} />
            ) : null}
          </div>
        ))
      }
    />
  );
};
