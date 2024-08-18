import { User } from './user.model';

export class Trip {
  id?: number;
  name: string = '';
  startTime: string = '';
  endTime: string = '';
  ticketPrice: number = 0;
  date: string = '';
  users: User[] = [];
}
