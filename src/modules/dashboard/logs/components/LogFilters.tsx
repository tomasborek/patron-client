import { ILogQuery } from '@/common/interfaces/server/log';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC } from 'react';

interface IProps {
  filters: {
    title?: string;
  }[];
}

const LogFilters: FC<IProps> = ({ filters }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {filters
        .filter(filter => !!filter.title)
        .map(filter => (
          <div className="flex w-min items-center gap-4 rounded-full bg-black p-4 text-white shadow-md">
            <p>{filter.title}</p>
            <div className="cursor-pointer">
              <FontAwesomeIcon icon="times" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default LogFilters;
