export interface IReservation {
  _id?: string;
  customerId?: string;
  note?: string;
  contacts: {
    phone: string;
    email: string;
  };
  underName?: string;
  bookingTime: string | number;
  reservationFor?: string;
  attrs: {
    [key: string]: number | string;
  };
  status?: 'Processing' | 'Done';
}
