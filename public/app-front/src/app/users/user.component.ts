import { Component, OnInit } from '@angular/core';
import { IUser, UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users!:IUser[];
  constructor(private userService :UsersService){

  }
  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data)=>{
        console.log(data);
        this.users=data;
      }
    )
  }

  delete(userId:any){
       this.userService.deleteOne(userId).subscribe(
        (data)=>{
            this.users = this.users.filter(user=>user._id!==userId);
        }
       )
  }

}
