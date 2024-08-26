import { User } from './user';
import { Question } from './question';

export class Answer {
  id: number = 0;
  content: string = '';
  user: User = new User();
  question: Question = new Question();
}
