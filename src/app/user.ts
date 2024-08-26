import { UserTripDetails } from './userTripDetails';

export class User {
  id: number = 0;
  username: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  role: string = 'VISITOR';

  // Linking to UserTripDetails
  userTripDetails: UserTripDetails[] = [];
}
