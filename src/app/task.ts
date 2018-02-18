import {Master} from './master';

export class Task {

  taskId: number;
  masterId: number;
  room: string;
  description: string;
  priority: number = 1;
  status: boolean;
  master: Master;
  building: string;

}
