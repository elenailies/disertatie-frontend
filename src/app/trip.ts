import { UserTripDetails } from './userTripDetails';

export class Trip {
  id: number = 0;
  name: string = '';
  startTime: string = '';
  endTime: string = '';
  ticketPrice: number = 0;
  date: string = '';

  // Linking to UserTripDetails
  userTripDetails: UserTripDetails[] = [];
}
