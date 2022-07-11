import { Component, OnInit } from '@angular/core';
import { AdminHotelRestService } from 'src/app/services/adminHotelRest/admin-hotel-rest.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  idAdminHotel: any;
  arrayClient: any;

  constructor(
    private adminHotel: AdminHotelRestService,
  ) { 
  }

  ngOnInit(): void {
      this.idAdminHotel = this.adminHotel.getIdentity()._id;

    this.getClientes();
  }

  getClientes(){
    this.adminHotel.getClientes(this.idAdminHotel).subscribe({
      next:(res:any)=>{
        this.arrayClient = res.arrayClients
        console.log(this.arrayClient);
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };



}
