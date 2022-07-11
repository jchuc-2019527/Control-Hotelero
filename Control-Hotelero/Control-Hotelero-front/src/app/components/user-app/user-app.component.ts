import { Component, OnInit } from '@angular/core';
import { userModel } from 'src/app/models/user.model';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {
  users:any;
  user: userModel;
  constructor(
    private adminAppRest: AdminAppRestService
  ) { 
    this.user = new userModel('','','','',''); 
  }

  ngOnInit(): void {
    this.getUsersbyAdmin()
  }

  getUsersbyAdmin(){
    this.adminAppRest.getUsersbyAdmin().subscribe({
      next:(res:any)=>{
        this.users = res.users;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

}
