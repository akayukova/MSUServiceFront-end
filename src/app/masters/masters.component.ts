import {Component, OnInit} from '@angular/core';
import {Master} from '../master';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestService} from '../services/request.service';
import {MessageService} from '../services/message.service';
import {Task} from '../task';
import {Paths} from '../paths';

const mergeAuthToken = (options) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${jwt}`
    });
    return {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`
      }, withCredentials: true
    };
  }
  return options;
};

let httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.css']
})
export class MastersComponent implements OnInit {
  id: string;
  success: boolean;
  tasks: Task[];
  editOn: boolean[] = [];
  master: Master;
  sorting: String = 'taskId';

  constructor(private http: HttpClient,
              public messageService: MessageService,
              private requestService: RequestService) {
  }

  ngOnInit() {
    const self = this;
    httpOptions = mergeAuthToken(httpOptions);
    self.id = localStorage.getItem('id');
    self.http.get<Master>(Paths.urlGetMasterById + `${self.id}`, httpOptions).subscribe(
      (master: Master) => {
        self.master = master;
        self.http.get<Task[]>(Paths.urlGetTasksForMaster + `${self.id}`, httpOptions)
          .subscribe(
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
      case 'time': {
        if (this.sorting === 'id') {
          this.tasks.reverse();
        } else {
          this.tasks.sort(
            (a: Task, b: Task): number => (<any>a.time) - (<any> b.time));
          this.sorting = 'id';
        }
        break;
      }
    }
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

  disableSorting(): boolean {
    return this.editOn.some(elem => elem === true);
  }


}
