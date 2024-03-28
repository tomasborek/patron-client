'use client';
import List from '@/common/components/List';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import InputItem from '@/common/components/ui/inputItem';
import { useInstitution } from '@/common/contexts/InstitutionContext';
import { useGetStations } from '@/common/hooks/api/useGetStations';
import { IBoxDTO } from '@/common/interfaces/server/box';
import { IStationDTO } from '@/common/interfaces/server/institution';
import DashboardWrapper from '@/modules/dashboard/components/DashboardWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BoxSelect } from '@/common/components/widgets/BoxSelect';
import { useState, type FC } from 'react';
import Button from '@/common/components/ui/button';
import { useCreateReservation } from '@/common/hooks/api/useCreateReservation';

const ReservationPage: FC = () => {
  const { institution } = useInstitution();
  const { stations } = useGetStations(institution?.id);
  const [selectedStation, setSelectedStation] = useState<IStationDTO | null>(
    null,
  );
  const [selectedBox, setSelectedBox] = useState<IBoxDTO | null>(null);
  const { createReservation, mutation } = useCreateReservation();
  if (!institution || !stations) return null;
  return (
    <DashboardWrapper title="Vytvořit rezervaci">
      <form
        className="flex flex-col gap-8"
        onSubmit={e => {
          e.preventDefault();
          selectedBox && createReservation(selectedBox?.id);
        }}
      >
        <InputItem label="Stanice" className="w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="flex items-center gap-4 rounded-md bg-gray-100 p-4 text-gray-600">
                <p>{selectedStation?.name ?? 'Vybrat stanici'}</p>
                <FontAwesomeIcon icon="chevron-down" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                Stanice instituce {institution.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <List
                items={stations}
                render={(items: IStationDTO[]) =>
                  items.map(s => (
                    <DropdownMenuItem
                      key={s.id}
                      onClick={() => setSelectedStation(s)}
                      className="cursor-pointer p-4"
                    >
                      {s.name}
                    </DropdownMenuItem>
                  ))
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </InputItem>
        {selectedStation ? (
          <InputItem label={`Box ${selectedStation.name}`}>
            <BoxSelect
              selectedBox={selectedBox}
              setSelectedBox={setSelectedBox}
              boxes={selectedStation?.boxes}
            />
          </InputItem>
        ) : (
          <p className="text-sm text-gray-400">
            Pro výběr boxu vyberte stanici...
          </p>
        )}
        <div className="flex flex-col rounded-md bg-white p-4 text-gray-600 shadow-sm">
          <h3 className="mb-2 font-bold">Rezervace</h3>
          <p>
            <span className="font-bold">Institutce:</span> {institution.name}
          </p>
          <p>
            <span className="font-bold">Stanice:</span>{' '}
            {selectedStation?.name ?? 'Není vybrána'}
          </p>
          <p>
            <span className="font-bold">Box:</span>{' '}
            {selectedBox?.localId ?? 'Není vybrán'}
          </p>
        </div>
        <div>
          <div className="rounded-md0 mb-4 flex items-center gap-4 text-sm text-gray-400">
            <FontAwesomeIcon icon="info-circle" />
            Rezervace bude platná od jejího vytvoření 24 hodin
          </div>
          <Button
            className="mb-32"
            loading={mutation.isPending}
            disabled={!selectedBox || !selectedStation}
          >
            Rezervovat
          </Button>
        </div>
      </form>
    </DashboardWrapper>
  );
};

export default ReservationPage;
