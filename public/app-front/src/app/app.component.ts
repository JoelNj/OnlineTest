import { Component, OnInit } from '@angular/core';
import { StateService, initialState } from './state.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  title = 'app-front';
  isLogeIn!:string;
  subcription !:Subscription;

  constructor(private _stateService: StateService, private _route:Router){

    this.subcription = this._stateService.getState().subscribe(
      (data)=>this.isLogeIn=data.jwt
    )

  }

  get isLoggedIn(){
    return  localStorage.getItem("token")
  }

  logOut() {
      this._stateService.setState(initialState);
      localStorage.clear();
      
      this._route.navigate(["/home"]);
    }

    ngOnDestroy(){
      this.subcription.unsubscribe();
    }
}
