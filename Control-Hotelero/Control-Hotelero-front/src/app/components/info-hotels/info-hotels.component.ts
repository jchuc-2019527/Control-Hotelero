import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
@Component({
  selector: 'app-info-hotels',
  templateUrl: './info-hotels.component.html',
  styleUrls: ['./info-hotels.component.css']
})
export class InfoHotelsComponent implements OnInit {
  role:any;

  idHotel : any;
  rooms: any;

  constructor(
    public activateRoute : ActivatedRoute,
    private hotelRest : HotelRestService,
    private adminRest : AdminAppRestService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('id');
    });
    this.role = this.adminRest.getIdentity().role;

    this.getRooms()
  };
  //Habitaciones
  getRooms(){
    this.hotelRest.getRooms(this.idHotel).subscribe({
      next:(res:any)=>{
        this.rooms = res.rooms
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };
  


}
