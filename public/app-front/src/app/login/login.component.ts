import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { IState, StateService } from '../state.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;

  constructor(private _authentificationService: AuthentificationService,
    private _stateService: StateService,private _route:Router) {
    this.formLogin = new FormGroup(
      {
        login: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    )
  }

  login() {

      
        this._authentificationService.authentification(this.formLogin.value)
          .subscribe(
            (data) => {
                if(data.isValid){
                      localStorage.setItem("token", data.message);
                      //this._stateService.setState({"jwt":data.message});
                      const decodedToken = jwt_decode(data.message);
                      this._route.navigate(["/home"]);
                }
            
             }

      )
  }

}
