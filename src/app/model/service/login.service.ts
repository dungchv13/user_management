import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../entities/user';
import {map} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
import {BehaviorSubject, Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  url = "http://localhost:8080"
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(sessionStorage.getItem(TOKEN_KEY));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: any){
    const signInUrl = this.url+'/login';
    return this.http.post(signInUrl, user, httpOptions)
      .pipe(map(
        data => {
          this.saveUserData(data);
          return data;
        }
      ))
  }

  saveUserData(data:any) {
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveUsername(data.username);
    this.tokenStorage.saveAuthorities(data.roles);
    this.tokenStorage.saveTokenType(data.tokenType);
    this.currentUserSubject.next(data.accessToken);
  }
}
