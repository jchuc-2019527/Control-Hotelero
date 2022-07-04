import { Component, OnInit } from '@angular/core';
import { hotelModel } from 'src/app/models/hotel.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { adminHotelModel } from 'src/app/models/adminHotel.model';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {
  hotels: any =[] ;
  hotel: hotelModel;
  adminHotel: adminHotelModel;
  token:any;
  role:string = ''; 

  constructor(
    private hotelRest: HotelRestService,
    private adminAppRest: AdminAppRestService
  ) {
    this.hotel = new hotelModel('','',0,'','','','');
    this.adminHotel = new adminHotelModel('','','','','');
   }

  ngOnInit(): void {
    this.getHotels();
    this.role = this.adminAppRest.getIdentity().role;
    this.token = this.adminAppRest.getToken();
  }

  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next:(res:any)=>{
        this.hotels = res.hotels;
        console.log(this.hotels);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };  

  addHotel(addHotelForm:any){
    this.hotelRest.addHotel( this.hotel).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.hotel.nameHotel,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getHotels()
        addHotelForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

}
