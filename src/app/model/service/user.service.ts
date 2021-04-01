import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../entities/user';
import {compareSegments} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // url = "http://localhost:8080/user"
  url = "http://user-management-hero.herokuapp.com/user"
  constructor(private http: HttpClient) { }

  getListUser(){
    const getAllUrl = this.url+'/all';
    return this.http.get<User[]>(getAllUrl);
  }

  deleteUser(id:any){
    const deleteUrl = this.url+'/delete/'+id;
    return this.http.delete(deleteUrl, { responseType: 'text'});

  }

  createUser(user: User) {
    const createUrl = this.url+'/create';
    return this.http.post<User>(createUrl, user);
  }

  updateUser(user: User){
    const updateUrl = this.url+'/update/'+user.id;
    return this.http.put<User>(updateUrl, user);
  }

  // searchName
  searchName(name: string){
    const searchNameUrl = this.url+'/searchName/'+name;
    return this.http.get<User[]>(searchNameUrl);
  }
  // searchAddress
  searchAddress(address: string){
    const searchAddressUrl = this.url+'/searchAddress/'+address;
    return this.http.get<User[]>(searchAddressUrl);
  }
  // searchAccountNumber
  searchAccountNumber(accountNumber: string){
    const searchAccountNumberUrl = this.url+'/searchAccountNumber/'+accountNumber;
    return this.http.get<User[]>(searchAccountNumberUrl);
  }
  // searchBalanceG
  searchBalanceG(balance: string){
    const searchBalanceGUrl = this.url+'/searchBalanceG/'+balance;
    return this.http.get<User[]>(searchBalanceGUrl);
  }
  // searchBalanceL
  searchBalanceL(balance: string){
    const searchBalanceLUrl = this.url+'/searchBalanceL/'+balance;
    return this.http.get<User[]>(searchBalanceLUrl);
  }

  //searchEmployer
  searchEmployer(employer: string){
    const searchEmployerUrl = this.url + '/searchEmployer/' + employer;
    return this.http.get<User[]>(searchEmployerUrl);
  }
}
