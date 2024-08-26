import { User } from './user';
import { Trip } from './trip';

export class UserTripDetails {
  id: number = 0;
  user: User = new User();  // The linked user
  trip: Trip = new Trip();  // The linked trip
  bookingDate: string = ''; // Additional field for booking information
}

