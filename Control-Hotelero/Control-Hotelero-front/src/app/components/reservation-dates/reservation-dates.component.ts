import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';

@Component({
  selector: 'app-reservation-dates',
  templateUrl: './reservation-dates.component.html',
  styleUrls: ['./reservation-dates.component.css']
})
export class ReservationDatesComponent implements OnInit {
  idReservation:any;
  idRoom:any;
  idHotel:any
  dates={
    startDate: '',
    finishDate: ''
  }

  constructor(
    public activateRoute: ActivatedRoute,
    private reservationRest: ReservationResService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idR:any)=>{
      this.idReservation =idR.get('idReservation');
    });
    this.activateRoute.paramMap.subscribe((idRo:any)=>{
      this.idRoom =idRo.get('idRoom');
    });
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('idHotel');
    });
  };

  pushDate(){
    this.reservationRest.pushDate(this.idReservation, this.idRoom, this.dates).subscribe({
      next:(res:any)=>{
        console.log(res.message)
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

}
