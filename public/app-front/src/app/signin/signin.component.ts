import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../state.service';
import { HttpClient } from '@angular/common/http';
import { IUser, UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  formNewUser!: FormGroup;
  isLogeIn !:boolean;

  constructor(private _userService : UsersService,private _route:Router){

  }

  ngOnInit(): void {
    this.formNewUser = new FormGroup(
      {
        login: new FormControl('', [Validators.required]),
        fullName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    )
  }

  createNewUser() {
       this._userService.addUser(this.formNewUser.value).subscribe(
            (data)=>{
                this._route.navigate(["/users"]);
            }
       )
  }





}
