import {Component, OnInit} from '@angular/core';
import {Master} from '../master';
import {HttpClient} from '@angular/common/http';
import {RequestService} from '../request.service';
import {MessageService} from '../message.service';
import {Task} from '../task';

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  id: number;
  success: boolean;
  tasks: Task[];
  editOn: boolean[] = [];
  master: Master;

  constructor(private http: HttpClient,
              public messageService: MessageService,
              private requestService: RequestService) {
  }

  ngOnInit() {
  }

  identification(id: number): void {
    const self = this;
    self.requestService.getMaster(id).subscribe(
      (master: Master) => {
        self.master = master;
        self.requestService.getTasksForMaster(id).subscribe(
          (tasks: Task[]) => {
            self.tasks = tasks;
            self.success = true;
            for (let i = 0; i < self.tasks.length; i++) {
              self.editOn[i] = false;
            }
          },
          error => console.log(error)
        );
      }
    );
  }

  editor(i: number): void {
    this.editOn[i] = true;
  }

  save(i: number): void {
    const self = this;
    self.requestService.editTask(self.tasks[i])
      .subscribe(
        (task: Task) => {
        },
        error => console.log(error)
      );
    self.requestService.getTask(self.tasks[i].taskId)
      .subscribe(
        (data: Task) => {
          self.tasks[i] = data;
        },
        error => console.log(error)
      );
    self.editOn[i] = false;
  }

  clearAll(): void {
    this.id = undefined;
    this.success = false;
    this.tasks = undefined;
  }

}
