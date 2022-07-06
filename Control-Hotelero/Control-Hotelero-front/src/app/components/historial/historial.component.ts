import { Component, OnInit } from '@angular/core';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { reservationModel } from 'src/app/models/reservation.model';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
services: any
reservations: any;
reservation: reservationModel;


  constructor(
    public reservationRest: ReservationResService,
  ) {
    this.reservation = new reservationModel('',new Date(),new Date(),'','','',[],0,false,0);

   }

  ngOnInit(): void {
    this.getReservations();
  };
  
  getReservations(){
    this.reservationRest.getReservations().subscribe({
      next:(res:any)=>{
        this.reservations = res.reservations;
        
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

}
