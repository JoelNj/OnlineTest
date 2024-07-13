import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './users.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private _http: HttpClient) { }

  private _state = new BehaviorSubject<IState>(initialState);

  getState() {
    return this._state.asObservable();
  }
  setState(new_state: IState) {
    this._state.next(new_state);
    return this._state.value;
  }

  isLoggedin() {
    return localStorage.getItem("token")?true:false;
  }
  getToken(){
    return localStorage.getItem("token") as String;
  }

}

export interface IState {
  jwt: string
}

export const initialState =
{
  jwt: ""
}
