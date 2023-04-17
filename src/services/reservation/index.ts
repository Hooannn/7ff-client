import { useMutation } from 'react-query';
import { onError } from '../../utils/error-handlers';
import useAxiosIns from '../../hooks/useAxiosIns';
import type { IReservation, IResponseData } from '../../types';

export default () => {
  const axios = useAxiosIns();
  const bookReservationMutation = useMutation({
    mutationKey: ['book-reservation'],
    mutationFn: (reservation: IReservation) => axios.post<IResponseData<IReservation>>(`/reservation`, reservation),
    onError: onError,
  });

  return { bookReservationMutation };
};
