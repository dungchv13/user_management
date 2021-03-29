import { Component, OnInit } from '@angular/core';
import {UserService} from '../model/service/user.service';
import {User} from '../model/entities/user';
import {Router} from '@angular/router';


declare var $:any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  search: any;
  key = 'account_number';
  reverse: boolean = false;
  page: number = 1;
  delete_account_number: any;
  delete_id: any;
  index_delete: any;
  index_edit: any;

  userModal:User = {};
  editUser:User = {};
  roles:any[] = [{name:'ROLE_USER'}];

  isInfo = false;
  isCreate = true;
  searchField = 'name';
  isText = true;

  constructor(public sv: UserService,private router:Router) { }

  ngOnInit(): void {
    this.sv.getListUser().subscribe(res => {
      this.userList = res;
    },error => {
      if(error.status == 401){
        alert("Please login !!!");
        this.router.navigate(['login']);
      }
    })

  }
  openCreateModal() {
    this.isInfo = false;
    this.userModal = {};
    this.userModal.roles = this.roles;
    this.isCreate = true;
    $('#myModal').modal('show');
  }

  openModalEdit(user: any, i: number) {

    this.isInfo = false;
    this.isCreate = false;
    this.index_edit = i + 10 * (this.page - 1);
    this.userModal.id = user.id;
    this.userModal.username = user.username;
    this.userModal.email = user.email;
    this.userModal.employer = user.employer;
    this.userModal.password = user.password;
    this.userModal.account_number = user.account_number;
    this.userModal.balance = user.balance;
    this.userModal.firstname = user.firstname;
    this.userModal.lastname = user.lastname;
    this.userModal.age = user.age;
    this.userModal.gender = user.gender;

    this.roles[0].name = user.roles[0].name;
    this.userModal.roles = this.roles;

    this.userModal.city = user.city;
    this.userModal.state = user.state;
    this.userModal.address = user.address;


    $('#myModal').modal('show');


  }

  openModalConfirmDelete(user: any, i: any) {
    this.delete_account_number = user.account_number;
    this.delete_id = user.id;
    this.index_delete = i + 10 * (this.page - 1);
    $('#confirmDel').modal('show');
  }

  delete() {
    this.sv.deleteUser(this.delete_id).subscribe(res =>{
      this.userList.splice(this.index_delete,1);
      $('#confirmDel').modal('hide');
    },error => {
     console.log(error)
      if(error.status == 403){
        alert("you have no authority")
      }
      $('#confirmDel').modal('hide');
    })
  }

  onSearch() {
    console.log(typeof this.search);
    console.log('SEARCH : '+this.search);
    if(this.search =='' || !this.search){
      this.ngOnInit();
    }else{
      if(this.searchField == 'name'){
        this.sv.searchName(this.search).subscribe(res =>{
          this.userList = res;
        },error => {
          console.log(error);
        })
      }
      if(this.searchField == 'address'){
        this.sv.searchAddress(this.search).subscribe(res =>{
          this.userList = res;
        },error => {
          console.log(error);
        })
      }
      if(this.searchField == 'employer'){
              this.sv.searchEmployer(this.search).subscribe(res =>{
                this.userList = res;
              },error => {
                console.log(error);
              })
            }
      if(this.searchField == 'account_number'){
        this.sv.searchAccountNumber(this.search).subscribe(res =>{
          this.userList = res;
        },error => {
          console.log(error);
        })
      }
      if(this.searchField == 'balanceG'){
        this.sv.searchBalanceG(this.search).subscribe(res =>{
          this.userList = res;
        },error => {
          console.log(error);
        })
      }
      if(this.searchField == 'balanceL'){
        this.sv.searchBalanceL(this.search).subscribe(res =>{
          this.userList = res;
        },error => {
          console.log(error);
        })
      }
    }

  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  submitModel() {
    if(!this.isCreate){
      this.sv.updateUser(this.userModal).subscribe(res =>{
          this.userList[this.index_edit] = res;
        $('#myModal').modal('hide');
      },error => {
        if(error.status == 400){
          alert("Username or Email or Account Number already in use");
        }
        if(error.status == 403){
          alert("you have no authority");
          $('#myModal').modal('hide');
        }
        console.log(error)
      })

    } else{
      this.sv.createUser(this.userModal).subscribe(res => {
        this.userList.push(res);
        $('#myModal').modal('hide');
      },error => {
        if(error.status == 400){
          alert("Username or Email or Account Number already in use");
        }
        if(error.status == 403){
          alert("you have no authority");
          $('#myModal').modal('hide');
        }
        console.log(error)
      });

    }
  }


  checkSearch() {
    this.isText = this.searchField == 'name' || this.searchField == 'address' || this.searchField == 'employer';
  }

  openModalInfo(user: any) {
    this.isCreate = false;
    this.isInfo = true;
    this.userModal.id = user.id;
    this.userModal.username = user.username;
    this.userModal.password = user.password;
    this.userModal.account_number = user.account_number;
    this.userModal.balance = user.balance;
    this.userModal.firstname = user.firstname;
    this.userModal.lastname = user.lastname;
    this.userModal.age = user.age;
    this.userModal.gender = user.gender;
    this.userModal.employer = user.employer;
    this.roles[0].name = user.roles[0].name;
    this.userModal.roles = this.roles;

    this.userModal.city = user.city;
    this.userModal.state = user.state;
    this.userModal.email = user.email;
    this.userModal.address = user.address;

    $('#myModal').modal('show');
  }
}
