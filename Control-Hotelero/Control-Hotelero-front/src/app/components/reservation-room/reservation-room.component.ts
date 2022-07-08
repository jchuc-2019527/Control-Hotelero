import { Component, OnInit } from '@angular/core';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-room',
  templateUrl: './reservation-room.component.html',
  styleUrls: ['./reservation-room.component.css']
})
export class ReservationRoomComponent implements OnInit {
  arrayRoom :any
  idReservation: any
  idHotel:any

  constructor(
    public activateRoute : ActivatedRoute,
    private reservationRest : ReservationResService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idR:any)=>{
      this.idReservation =idR.get('idReservation');
    });
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('idHotel');
    });
    this.getRooms();
  };

  getRooms(){
    this.reservationRest.getRooms(this.idHotel).subscribe({
      next:(res:any)=>{
        this.arrayRoom = res.rooms
        console.log(this.arrayRoom)
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }


  updateRoom(idRoom:string){
    this.reservationRest.updateRoom(this.idReservation, idRoom).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    
  }

}
