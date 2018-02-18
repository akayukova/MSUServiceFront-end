import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {Task} from '../task';

import {RequestService} from '../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private requestService: RequestService,
              private location: Location) {
  }

  task: Task = new Task();
  receivedTask: Task;
  done = false;
  buildings: string[] = ['Б', 'В', 'Г', 'Д', 'Е', 'Ж'];


  add(): void {
    if (!this.task) {
      return;
    }
    this.requestService.addTask(this.task)
      .subscribe(
        (data: Task) => {
          this.receivedTask = data;
          this.done = true;
        },
        error => console.log(error)
      );
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
  }

}
