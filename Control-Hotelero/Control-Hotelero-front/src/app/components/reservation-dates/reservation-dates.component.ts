import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import Swal from 'sweetalert2';

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

  roomDates:any

  constructor(
    public activateRoute: ActivatedRoute,
    private reservationRest: ReservationResService,
    private router: Router
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

    this.getRoom();
  };

  pushDate(){
    this.reservationRest.pushDate(this.idReservation, this.idRoom, this.dates).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.router.navigateByUrl('/reservationServices/' + this.idReservation +'/'+ this.idHotel)
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })

  };

  getRoom(){
    this.reservationRest.getRoom(this.idRoom).subscribe({
      next:(res:any)=>{
        this.roomDates = res.room
        console.log(this.roomDates)
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

}
