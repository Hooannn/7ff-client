export interface IReservation {
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
}
