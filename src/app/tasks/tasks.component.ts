import {MessageService} from '../message.service';
import {RequestService} from '../request.service';
import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {HttpClient} from '@angular/common/http';
import {Master} from '../master';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['../masters/masters.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  masters: Master[];
  urlTasks = 'http://localhost:9090/test1';
  urlMasters = 'http://localhost:9090/test';
  editOn: boolean[] = [];
  masterIndex: number[] = [];
  priorityValid: boolean[] = [];
  sorting: String = 'taskId';

  constructor(private http: HttpClient,
              public messageService: MessageService,
              private requestService: RequestService) {
  }

  ngOnInit() {
    this.http.get(this.urlTasks).subscribe(
      (data: Task[]) => {
        this.tasks = data;
        for (let i = 0; i < this.tasks.length; i++) {
          this.editOn[i] = false;
          this.masterIndex[i] = 0;
          this.priorityValid[i] = true;
        }
      },
      error => console.log(error));
    // this.editOn.length = this.tasks.length;
    // while (undefined === this.tasks) {}
    this.http.get(this.urlMasters).subscribe(
      (data: Master[]) => this.masters = data,
      error => console.log(error));
  }

  editor(i: number): void {
    this.editOn[i] = true;
  }

  save(i: number): void {
    this.requestService.editTask(this.tasks[i])
      .subscribe(
        (data: Task) => {
        },
        error => console.log(error)
      );
    this.requestService.getTask(this.tasks[i].taskId)
      .subscribe(
        (data: Task) => {
          this.tasks[i] = data;
        },
        error => console.log(error)
      );
    this.editOn[i] = false;
    this.priorityValid[i] = true;
  }

  tableSorting(byField: string) {
    switch (byField) {
      case 'priority': {
        if (this.sorting === 'priority') {
          this.tasks.reverse();
        } else {
          this.tasks.sort(
            (a: Task, b: Task): number => a.priority - b.priority);
          this.sorting = 'priority';
        }
        break;
      }
      case 'status': {
        if (this.sorting === 'status') {
          this.tasks.reverse();
        } else {
          this.tasks.sort(
            (a: Task, b: Task): number => {
              if (a.status === b.status) {
                return 0;
              }
              if (a.status === true) {
                return 1;
              } else {
                return -1;
              }
            });
          this.sorting = 'status';
        }
        break;
      }
      case 'id': {
        if (this.sorting === 'id') {
          this.tasks.reverse();
        } else {
          this.tasks.sort(
            (a: Task, b: Task): number => a.taskId - b.taskId);
          this.sorting = 'id';
        }
        break;
      }
      case 'masterid': {
        if (this.sorting === 'masterid') {
          this.tasks.reverse();
        } else {
          this.tasks.sort(
            (a: Task, b: Task): number => a.masterId - b.masterId);
          this.sorting = 'masterid';
        }
        break;
      }
    }
  }

  onChangeMaster(master: Master, i: number) {
    this.masterIndex[i] = master.masterId;
    this.tasks[i].masterId = master.masterId;
  }

  onChangePriority(pV, i) {
    this.priorityValid[i] = pV;
  }

  disableSorting(): boolean {
    return this.editOn.some(elem => elem === true);
  }
}

