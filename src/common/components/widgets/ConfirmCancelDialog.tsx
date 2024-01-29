import { useEffect, type FC } from 'react';
import Dialog from '../ui/dialog';
import Button from '../ui/button';
import { useCancelReservation } from '@/common/hooks/api/useCancelReservation';

interface IProps {
  reservationId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmCancelDialog: FC<IProps> = ({ reservationId, open, setOpen }) => {
  const { cancelReservation, mutation } = useCancelReservation();

  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }, [mutation.isSuccess]);
  return (
    <Dialog
      title="Opravdu chcete zrušit rezervaci?"
      open={open}
      setOpen={setOpen}
    >
      <div className="flex items-center gap-4 ">
        <Button
          loading={mutation.isPending}
          variant="primary"
          onClick={() => {
            cancelReservation(reservationId);
          }}
        >
          Ano
        </Button>
        <Button
          variant="neutral"
          onClick={() => {
            setOpen(false);
          }}
        >
          Ne
        </Button>
      </div>
    </Dialog>
  );
};

export default ConfirmCancelDialog;
