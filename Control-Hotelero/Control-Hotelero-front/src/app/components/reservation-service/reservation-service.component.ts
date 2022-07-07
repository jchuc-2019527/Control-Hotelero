import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';

@Component({
  selector: 'app-reservation-service',
  templateUrl: './reservation-service.component.html',
  styleUrls: ['./reservation-service.component.css']
})
export class ReservationServiceComponent implements OnInit {
  idReservation:any
  idHotel:any

  arrayService: any

  constructor(
    public activateRoute: ActivatedRoute,
    private reservationRest: ReservationResService
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idR:any)=>{
      this.idReservation =idR.get('idReservation');
    });
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('idHotel');
    });
    this.getServices()
  };

  getServices(){
    this.reservationRest.getServices(this.idHotel).subscribe({
      next:(res:any)=>{
        this.arrayService = res.services
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

  pushServices(idService:string){
    this.reservationRest.pushService(this.idReservation, idService).subscribe({
      next:(res:any)=>{
        console.log(res.message)
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

}
