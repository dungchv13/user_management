import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/entities/user';
import {LoginService} from '../model/service/login.service';
import {TokenStorageService} from '../model/service/token-storage.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User={
    username: '',
    password: ''
  }


  isLoginFailed = false;
  errorMessage:any;

  constructor(
    private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.errorMessage ='';
  }

  onSubmit() {
    this.loginService.login(this.user)
      .pipe(first()).subscribe(data => {
          this.isLoginFailed = false;
          this.router.navigateByUrl("/users");
          },
      error => {
        this.isLoginFailed = true;
        if (error.status == "401") {
          this.errorMessage = "Username or password is wrong";
        }
      }
    )
  }
}
