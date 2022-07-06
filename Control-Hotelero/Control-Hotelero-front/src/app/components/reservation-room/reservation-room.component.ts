import { Component, OnInit } from '@angular/core';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-room',
  templateUrl: './reservation-room.component.html',
  styleUrls: ['./reservation-room.component.css']
})
export class ReservationRoomComponent implements OnInit {

  idReservation: any

  constructor(
    public activateRoute : ActivatedRoute,
    private reservationRest : ReservationResService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idR:any)=>{
      this.idReservation =idR.get('id');
    });
  };

  

  updateRoom(){
    
  }

}
