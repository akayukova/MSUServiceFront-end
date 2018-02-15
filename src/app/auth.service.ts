import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {JsonHttp} from './JsonHttp';
import {HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Paths} from './paths';

//const jwtDecode = require('jwt-decode');

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  private authEvents: Subject<AuthEvent>;

  constructor(private http: JsonHttp) {
    this.authEvents = new Subject<AuthEvent>();
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    };
    return this.http.post(Paths.urlAuthorization, body, httpOptions).pipe(
      tap((resp: any) => {
        localStorage.setItem('jwt', resp.token);
        this.authEvents.next(new DidLogin());
      })
    );
  }


  logout(): void {
    localStorage.removeItem('jwt');
    this.authEvents.next(new DidLogout());
  }

  isSignedIn(): boolean {
    return localStorage.getItem('jwt') !== null;
  }

  get events(): Observable<AuthEvent> {
    return this.authEvents;
  }

}

export class DidLogin {
}

export class DidLogout {
}

export type AuthEvent = DidLogin | DidLogout;
