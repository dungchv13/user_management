import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq: any = {};
    const token = this.token.getToken();
    if (token != null) {
      authReq.setHeaders = {
        Authorization: `Bearer ${token}`
      }
    }
    req = req.clone(authReq);
    return next.handle(req);
  }
}
