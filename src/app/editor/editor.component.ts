import {RequestService} from '../request.service';
import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../task';
import {Master} from '../master';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  templateUrl: './editor.component.html',
  selector: 'app-editor',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() task: Task;
  @Output() taskChange = new EventEmitter<Task>();

  masters: Master[];
  url = 'http://localhost:9090/test';

  // onTaskChange(model: Master){
  //   this.task.master = model;
  //   this.taskChange.master.emit(model);

  edit(): void {
    this.requestService.editTask(this.task)
      .subscribe(
      (data: Task) => {},
      error => console.log(error)
      );
    this.requestService.getTask(this.task.taskId)
      .subscribe(
      (data: Task) => {this.task = data;},
      error => console.log(error)
    );
  }

  hide(): void {
    this.task = undefined;
  }

  constructor(private http: HttpClient,
    public messageService: MessageService,
    private requestService: RequestService,
  private location: Location) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(
      (data: Master[]) => this.masters = data,
      error => console.log(error));
  }

}
