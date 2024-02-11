import { useContext, createContext, type FC, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import toaster from 'react-hot-toast';
import { IBoxDTO } from '../interfaces/server/box';

interface IInterfaceContext {
  processReturn: (code: string) => void;
  processReservation: (code: string) => void;
  processBorrow: (code: string, boxId: string) => void;
  setStationId: React.Dispatch<React.SetStateAction<string | null>>;
  connect: (id: string, password: string) => void;
  connected: boolean;
  boxes: IBoxDTO[];
}

const InterfaceContext = createContext<IInterfaceContext | null>(null);

export const useInterface = () => {
  const context = useContext(InterfaceContext);
  if (!context) {
    throw new Error('useInterface must be used within a InterfaceProvider');
  }
  return context;
};

export const InterfaceProvider: FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  const [stationId, setStationId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [boxes, setBoxes] = useState<IBoxDTO[]>([]);
  const connected = !!socket?.active;
  const router = useRouter();
  const connect = (id: string, password: string) => {
    const socket = io('http://localhost:3030', {
      auth: { password },
      query: { id },
    });
    socket.on('connect', () => {
      setStationId(id);
      router.push('/user-interface/communication');
    });
    setSocket(socket);
    socket.on('status', (data: any) => {
      console.log(data);
      setBoxes(data.data.boxes);
    });
  };

  const processBorrow = (code: string, boxId: string) => {
    if (!stationId || !socket) throw new Error('Station ID is not set');
    const data = {
      event: 'borrow',
      data: {
        id: stationId,
        code,
        boxId,
      },
    };
    socket.emit('message', data);
    router.push('/user-interface/communication');
  };

  const processReservation = (code: string) => {
    if (!stationId || !socket) throw new Error('Station ID is not set');
    const data = {
      event: 'reservation',
      data: {
        id: stationId,
        code,
      },
    };
    socket.emit('message', data);
    router.push('/user-interface/communication');
  };
  const processReturn = (code: string) => {
    if (!stationId || !socket) throw new Error('Station ID is not set');
    const data = {
      event: 'return',
      data: {
        id: stationId,
        code,
      },
    };
    socket.emit('message', data);
    router.push('/user-interface/communication');
  };

  return (
    <InterfaceContext.Provider
      value={{
        processReservation,
        processReturn,
        processBorrow,
        setStationId,
        connect,
        connected,
        boxes,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};
