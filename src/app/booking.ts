import { User } from './user';
import { Trip } from './trip';

export class Booking {
  id: number = 0;
  user: User = new User();
  trip: Trip = new Trip();
  bookingDate: string = '';
  nrTickets: number = 0;
  totalCost: number = 0.0;
}
