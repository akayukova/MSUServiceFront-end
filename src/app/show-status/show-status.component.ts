import {Component} from '@angular/core';
import {RequestService} from '../services/request.service';
import {Task} from '../task';

@Component({
  selector: 'app-show-status',
  templateUrl: './show-status.component.html',
  styleUrls: ['./show-status.component.css']
})
export class ShowStatusComponent {

  id: number;
  task: Task;

  constructor(private requestService: RequestService) {
  }

  identification(id: number): void {
    const self = this;
    self.requestService.getTask(id).subscribe(
      (task: Task) => {
        self.task = task;
      }, e => this.handleError(e));
  }

  next() {
    this.task = undefined;
    this.id = undefined;
  }

  handleError(error) {
    switch (error.status) {
      case 500:
        alert('Заявки с таким номером не существует!');
    }
  }

}
