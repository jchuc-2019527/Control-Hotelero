import { Component, OnInit } from '@angular/core';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { reservationModel } from 'src/app/models/reservation.model';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  idClient:any
services: any
reservations: any;
reservation: reservationModel;

search:any


  constructor(
    public reservationRest: ReservationResService,
    private adminRest : AdminAppRestService 
  ) {
    this.reservation = new reservationModel('',new Date(),new Date(),'','','',[],0,false,0);

   }

  ngOnInit(): void {
    this.getReservations();
    this.idClient = this.adminRest.getIdentity()._id;
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
