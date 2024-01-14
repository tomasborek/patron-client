import type { FC } from 'react';
import { useInstitution } from '../../contexts/InstitutionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
const InstitutionCode: FC = () => {
  const { institution } = useInstitution();
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4 shadow-md">
      <header className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">
          Pin k instituci {institution?.name}
        </h3>
        <Popover>
          <PopoverTrigger>
            <div className="action">
              <FontAwesomeIcon icon="ellipsis-v" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="rounded-md bg-white p-2 shadow-md">
            <ul>
              <li className="cursor-pointer rounded-md p-2 transition-all hover:bg-gray-100">
                Deaktivovat
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </header>
      <div className="rounded-md bg-gray-100 p-4">
        <h2 className="text-center text-xl font-bold text-gray-600">
          {institution?.code}
        </h2>
      </div>
    </div>
  );
};

export default InstitutionCode;
