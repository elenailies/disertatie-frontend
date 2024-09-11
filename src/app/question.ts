import { User } from './user';
import { Answer } from './answer';

export class Question {
  id: number = 0;
  title: string = '';
  description: string = '';
  user: User = new User();
  enabled: boolean = true;

  // Linking to Answer
  answers: Answer[] = [];
}
