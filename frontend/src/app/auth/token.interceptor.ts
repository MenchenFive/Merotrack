import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { NbTokenService, NbAuthToken } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public tokenService: NbTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let myToken: NbAuthToken;
    this.tokenService.get().subscribe(res => myToken = res);

    request = request.clone({
      setHeaders: {
        Authorization: `${myToken.getValue()}`
      }
    });
    return next.handle(request);
  }
}