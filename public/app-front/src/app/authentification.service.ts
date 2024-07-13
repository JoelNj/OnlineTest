import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IState } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  url: string = "http://localhost:3000/api/login";

  constructor(private _http: HttpClient) { }
  public authentification(userLogin: login): Observable<{isValid:boolean,message:string}> {
    return this._http.post<{isValid:boolean,message:string}>(this.url, userLogin);
  }
}

interface login {
  login?: string,
  password?: string
}


