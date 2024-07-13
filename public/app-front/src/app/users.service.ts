import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  base_Url:string=environment.USERS_BASE_URL;
  constructor(private _http:HttpClient) { }

  public addUser(newUser:IUser) :Observable<IUser> {
       return this._http.post<IUser>(this.base_Url,newUser);
  }

  public getAll() :Observable<[IUser]> {
   return this._http.get<[IUser]>(this.base_Url);
  }

  public deleteOne(userId:String){
    return this._http.delete(this.base_Url+userId);
  } 
}

export interface IUser {

  _id?:String,
  fullName?: String,
  login?: String,
  password?: String

}
