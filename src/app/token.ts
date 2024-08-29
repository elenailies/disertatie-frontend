import { User } from './user';

export class Token {
  id: number = 0;
  tokenValue: string = '';
  expiryDate: Date = new Date();
  enabled: boolean = true;
  user: User = new User();
}
