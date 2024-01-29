import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/common/contexts/AuthContext';
import { ReservationService } from '@/lib/services/reservation.service';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
export const useCancelReservation = () => {
  const { token } = useAuth();
  const service = new ReservationService(token);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => service.cancel(id),
    onSuccess: () => {
      toast.success('Rezervace zrušena');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: () => {
      toast.error('Něco se pokazilo');
    },
  });

  return {
    cancelReservation: mutation.mutate,
    mutation,
  };
};
