import { Component, OnInit } from '@angular/core';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {
  hotel: string=''
  role:string = ''; 

  constructor(
    private adminAppRest : AdminAppRestService,
    private hotelRest : HotelRestService
  ) { }

  ngOnInit(): void {
    this.role = this.adminAppRest.getIdentity().role;
    

  };

  getHotelByAdmin(){
    this.hotelRest.getHotelByAdmin().subscribe({
      next:(res:any)=>{
        this.hotel = res.hotelId;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

}
