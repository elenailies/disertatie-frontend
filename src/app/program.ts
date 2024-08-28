import { Trip } from './trip';
import { Destination } from './destination';

export class Program {
  id: number = 0;
  trip: Trip = new Trip();
  destination: Destination = new Destination();
  startTime: string = '';
  endTime: string = '';
}
