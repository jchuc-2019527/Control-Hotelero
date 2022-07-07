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

  search:any;
  searchDi: any;
  
  hotelUpdate: any;
  hotels: any =[] ;
  hotel: hotelModel;
  adminHotel: adminHotelModel;
  token:any;
  role:string = '';
  createHotel = {
    nameHotel: "",
    direction: "",
    phone: "",
    email: "",
    request: 0,
    adminHotel: "",
    name:"",
    username:"",
    password:"",
    role:""
  }


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
        this.hotels = res.hoteles;
        console.log(this.hotels);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

  getHotel(idHotel: string){
    this.hotelRest.getHotel(idHotel).subscribe({
      next:(res:any)=>{this.hotelUpdate = res.hotel},
      error:(err)=>{alert(err.error.message)}
    })
  };

  addHotel(addHotelForm:any){
    this.hotelRest.addHotel(this.createHotel).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
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

  updateHotel(){
    this.hotelRest.updateHotel(this.hotelUpdate._id, this.hotelUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.updateHotel.nameHotel,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getHotels()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })

    })
  };

  deleteHotel(idHotel: string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar este hotel?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.hotelRest.deleteHotel(idHotel).subscribe({
          next:(res:any)=>{
            this.getHotels();
          },
          error:(err)=>Swal.fire({
            title: err.error.message,
            icon: 'error',
            timer: 4000,
            position:'center'
          })
        })
        swalWithBootstrapButtons.fire(
          'Hotel eliminado!',
          'Su archivo ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se elimino :)',
          'error'
        )
      }
    })

  };


}
