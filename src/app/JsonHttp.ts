import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


const mergeAuthToken = (options) => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    options.headers = options.headers.append({'authorization': `Bearer ${jwt}`});
    return options;
  }
  return options;
};


@Injectable()
export class JsonHttp {

  constructor(private http: HttpClient) {
  }

  get(url: string, options?): Observable<ArrayBuffer> {
    return this.http.get(url, mergeAuthToken(options));
  }

  post(url: string, body: any, options): Observable<ArrayBuffer> {
    return this.http.post(url, body, mergeAuthToken(options));
  }

  put(url: string, body: any, options): Observable<ArrayBuffer> {
    return this.http.put(url, body, mergeAuthToken(options));
  }

  delete(url: string, options): Observable<ArrayBuffer> {
    return this.http.delete(url, mergeAuthToken(options));
  }

  patch(url: string, body: any, options): Observable<ArrayBuffer> {
    return this.http.patch(url, body, mergeAuthToken(options));
  }

  head(url: string, options): Observable<ArrayBuffer> {
    return this.http.head(url, mergeAuthToken(options));
  }

}
