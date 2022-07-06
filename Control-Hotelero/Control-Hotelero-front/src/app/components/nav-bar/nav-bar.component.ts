import { Component, OnInit } from '@angular/core';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  token:any;
  role:string = ''; 
  id: string = '';
  constructor(
    private adminAppRest: AdminAppRestService,
  ) { }

  ngOnInit(): void {
    this.role = this.adminAppRest.getIdentity().role;
    this.token = this.adminAppRest.getToken();
  }

  logOut(){
    localStorage.clear(); //LIMPIA EL LOCAL STORAGE
  }
}
