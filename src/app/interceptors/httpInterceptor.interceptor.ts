import { Injectable }   from '@angular/core';
import {
  XHRBackend,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Http,
  Headers,
}                       from '@angular/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/merge';

import { UserService }  from '../services';

@Injectable()
export class HttpAuthInterceptor extends Http {
  private orig: Request;
  private headerName = 'Authorization';

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private user: UserService,
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      return this.get(url, options);
    }
    this.orig = url as Request;
    return super.request(url, options).catch(this.catchErrors());
  }

  private requestWithToken(req: Request): Observable<Response> {
    req.headers.set(this.headerName, 'JWT ' + this.user.token);
    return super.request(req);
  }

  private catchErrors() {
    return (err: any, caught: Observable<Response>): Observable<Response> => {
      if (err.status === 401) {
        const orig = this.orig;

        return this.refreshToken()
          .mergeMap((res) => {
            if (res) {
              const data = res.json();
              if (data.token) {
                this.user.token = data.token;
                return this.requestWithToken(orig);
              }
            }
            return Observable.throw(err);
          });
      }
      return Observable.throw(err);
    };
  }

  private refreshToken(): Observable<Response> {
    return super
      .post(this.user.refreshUrl, this.user.userBodyRequest);
  }
}
