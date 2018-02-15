import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {Task} from '../task';
import {MessageService} from './message.service';
import {Master} from '../master';
import {Paths} from '../paths';

let httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

@Injectable()
export class RequestService {

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getTask(id: number): Observable<Task> {
    httpOptions = mergeAuthToken(httpOptions);
    return this.http.get<Task>(Paths.urlGetTaskById + `${id}`,httpOptions).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  getMaster(id: number): Observable<Master> {
    httpOptions = mergeAuthToken(httpOptions);
    return this.http.get<Master>(Paths.urlGetMasterById + `${id}`).pipe(
      tap(_ => this.log(`fetched master id=${id}`)),
      catchError(this.handleError<Master>(`getMaster id=${id}`))
    );
  }

  getTasksForMaster(id: number): Observable<Task[]> {
    httpOptions = mergeAuthToken(httpOptions);
    const url = `http://localhost:9090/masters?id=${id}`;
    return this.http.get<Task[]>(url).pipe(
      tap(_ => this.log(`fetched master id=${id}`)),
      catchError(this.handleError<Task[]>(`getTasksForMaster id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    httpOptions = mergeAuthToken(httpOptions);
    return this.http.post<Task>(Paths.urlAddTask, task, httpOptions).pipe(
      tap((task: Task) => this.log(`added task id ${task.taskId}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  editTask(newTask: Task): Observable<Task> {
    httpOptions = mergeAuthToken(httpOptions);
    return this.http.post<Task>(Paths.urlEditTask, newTask, httpOptions).pipe(
      tap((task: Task) => this.log(`edited task id ${task.taskId}`)),
      catchError(this.handleError<Task>('editTask'))
    );
  }

  searchMasters(term: string): Observable<Master[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Master[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Master[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('Your request submitted: ' + message);
  }

}