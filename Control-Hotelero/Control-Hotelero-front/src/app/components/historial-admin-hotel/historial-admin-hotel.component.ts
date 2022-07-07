import { Component, OnInit } from '@angular/core';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { reservationModel } from 'src/app/models/reservation.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-admin-hotel',
  templateUrl: './historial-admin-hotel.component.html',
  styleUrls: ['./historial-admin-hotel.component.css']
})
export class HistorialAdminHotelComponent implements OnInit {
  services: any;
  idHotel: any;
  search: any;

  reservations: any;
  reservation: reservationModel;
  constructor(
    public reservationRest: ReservationResService,
    public activateRoute : ActivatedRoute,
  ) { 
    this.reservation = new reservationModel('',new Date(),new Date(),'','','',[],0,false,0);
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('id');
    });

    this.getReservationsByHotel(this.idHotel);
  }

  getReservationsByHotel(idHotel:string){
    this.reservationRest.getReservationsByHotel(idHotel).subscribe({
      next:(res:any)=>{
        this.reservations = res.reservations;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

  generateInvoice(idReservation:string){
    this.reservationRest.generateInvoice(idReservation).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message ,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getReservationsByHotel(this.idHotel);
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