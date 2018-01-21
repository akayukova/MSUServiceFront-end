import {Component} from '@angular/core';
import {Master} from './master';
import {HttpClient} from '@angular/common/http';
import {Task} from './task';
import {MessageComponent} from './message/message.component';
import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Repair Service';
  master: Master;
  tasks: Task[];

  constructor(private http: HttpClient,
    public messageService: MessageService) {}

  ngOnInit() {

    //this.http.get('http://localhost:9090//test1').subscribe((data: Task[]) => this.tasks = data);
  }
}
