import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import Swal from 'sweetalert2';

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
    private reservationRest: ReservationResService,
    private router: Router
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

  pushServices(service:string){
    this.reservationRest.pushService(this.idReservation, service).subscribe({
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
  };

  confirmateReservation(){
    this.reservationRest.confirmateReservation(this.idReservation).subscribe({
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
  };

  cancelReservation(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de cancelar su reservación?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationRest.cancelReservation(this.idReservation).subscribe({
          next:(res:any)=>{
            this.router.navigateByUrl('/bienvenida')
          },
          error:(err)=>Swal.fire({
            title: err.error.message,
            icon: 'error',
            timer: 4000,
            position:'center'
          })
        })
        swalWithBootstrapButtons.fire(
          'Reservación Cancelada!',
          'Su reservación ha sido Cancelada.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se logro cancelar su reservación :)',
          'error'
        )
      }
    })
  };





}
