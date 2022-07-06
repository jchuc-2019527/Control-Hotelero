import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
import { roomModel } from 'src/app/models/room.model';
import { serviceModel } from 'src/app/models/service.model';
import { eventModel } from 'src/app/models/event.model';
import Swal from 'sweetalert2';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';
import { reservationModel } from 'src/app/models/reservation.model';



@Component({
  selector: 'app-info-hotels',
  templateUrl: './info-hotels.component.html',
  styleUrls: ['./info-hotels.component.css']
})
export class InfoHotelsComponent implements OnInit {
  role:any;
  idClient:any
  idReservation:any
  ruta:any

  idHotel : any;
// habitaciones
  rooms: any;
  room: roomModel;
  roomUpdate: any = [];

// servicios
  services: any;
  service: serviceModel;
  serviceUpdate: any = [];

// eventos
events: any;
event: eventModel;
eventUpdate: any = [];

  reservation: reservationModel;

  constructor(
    public activateRoute : ActivatedRoute,
    private hotelRest : HotelRestService,
    private adminRest : AdminAppRestService,
    private reservationRest: ReservationResService,
    private router:Router
    
  ) {

    this.room = new roomModel('','','',0,[],'',false);
    this.service = new serviceModel('','',0,'');
    this.event = new eventModel('','','','');
    this.reservation = new reservationModel('',new Date(),new Date(),'','','',[],0,false,0);
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idH:any)=>{
      this.idHotel =idH.get('id');
    });
    this.role = this.adminRest.getIdentity().role;
    this.idClient = this.adminRest.getIdentity()._id;

    this.getRooms()
    this.getServices()
    this.getEvents()
  };
  //Habitaciones
  getRooms(){
    this.hotelRest.getRooms(this.idHotel).subscribe({
      next:(res:any)=>{
        this.rooms = res.rooms
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getRoom(idRoom: string){
    this.hotelRest.getRoom(idRoom,).subscribe({
      next:(res:any)=>{this.roomUpdate = res.room},
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };



  addRoom(addRoomForm:any){
    this.hotelRest.addRoom(this.idHotel, this.room).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.room.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getRooms()
        addRoomForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  updateRoom(){
    this.hotelRest.updateRoom(this.roomUpdate._id, this.roomUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.roomUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getRooms()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
    })
  };
  
  deleteRoom(id: string){
    this.hotelRest.deleteRoom(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.roomDelete.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getRooms();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  // Servicios

  getServices(){
    this.hotelRest.getServices(this.idHotel).subscribe({
      next:(res:any)=>{
        this.services = res.services
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getService(idService: string){
    this.hotelRest.getService(idService).subscribe({
      next:(res:any)=>{this.serviceUpdate = res.service},
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  addService(addServiceForm:any){
    this.hotelRest.addService(this.idHotel, this.service).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.service.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getServices()
        addServiceForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  updateService(){
    this.hotelRest.updateService(this.serviceUpdate._id, this.serviceUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.serviceUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getServices()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
    })
  };

  deleteService(id: string){
    this.hotelRest.deleteService(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.serviceDelete.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getServices();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };


  // Eventos

  getEvents(){
    this.hotelRest.getEvents(this.idHotel).subscribe({
      next:(res:any)=>{
        this.events = res.events
      },
      error:(err)=>{
        console.log(err.error.message || err.error)
      }
    })
  };

  getEvent(idEvent: string){
    this.hotelRest.getEvent(idEvent).subscribe({
      next:(res:any)=>{this.eventUpdate = res.event},
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  addEvent(addEventForm:any){
    this.hotelRest.addEvent(this.idHotel, this.event).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.event.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents()
        addEventForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  updateEvent(){
    this.hotelRest.updateEvent(this.eventUpdate._id, this.eventUpdate).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.eventUpdate.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents()},
        error:(err)=>Swal.fire({
          title: err.error.message,
          icon: 'error',
          timer: 4000,
          position:'center'
        })
    })
  };

  deleteEvent(id: string){
    this.hotelRest.deleteEvent(id).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.eventDelete.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getEvents();
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };

  //Reservación

  createReservation(){
    
    this.reservationRest.createReservation(this.idClient,this.idHotel, this.reservation).subscribe({
      next:(res:any)=>{
        console.log(res.message)
        console.log(res.reservation)
         this.idReservation = res.reservation._id;
         this.router.navigateByUrl('/reservationRoom/' + this.idReservation);
      },
      error:(err)=>
        console.log(err.error.message || err.error)
    })
  }

}