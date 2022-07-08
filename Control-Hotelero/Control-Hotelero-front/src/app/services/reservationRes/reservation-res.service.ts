import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminAppRestService } from '../adminAppRest/admin-app-rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationResService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.adminApp.getToken()
  })
  constructor(
    private http: HttpClient,
    private adminApp: AdminAppRestService
  ) { }

    //Mostrar mis reservaciones
    getReservations(){
      return this.http.get(environment.baseUrl + 'reservation/getReservations', {headers:this.httOptions})
    }

  //Reservation-Room:

  createReservation(idClient:string,idHotel:string, params:any){
    return this.http.post(environment.baseUrl + 'reservation/addReservation/' + idClient +'/'+ idHotel, params, {headers:this.httOptions});
  };

  updateRoom(idReservation: string, room: any){
    let body = JSON.stringify({room})
    return this.http.put(environment.baseUrl + 'reservation/updateRoom/' + idReservation, body, {headers:this.httOptions});
  };


  getRooms(idHotel: string){
      return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel, {headers:this.httOptions})
  };

  //Reservation-Dates

  pushDate(idReservation:string, idRoom:string, params:any){
    return this.http.put(environment.baseUrl + 'reservation/pushDate/' + idReservation +'/'+ idRoom, params, {headers:this.httOptions});
  }

  //Reservation Services
  pushService(idReservation:string, service:any){

    let body = JSON.stringify({service})
    return this.http.put(environment.baseUrl + 'reservation/pushServices/' + idReservation, body, {headers:this.httOptions});

  };

  getServices(idHotel:string){
    return this.http.get(environment.baseUrl + 'service/getServices/' + idHotel, {headers:this.httOptions});
  };

  confirmateReservation(idReservation:string){
    return this.http.put(environment.baseUrl + 'reservation/confirmateReservation/' + idReservation, {headers:this.httOptions});
  };
  
  cancelReservation(idReservation:string){
    return this.http.put(environment.baseUrl + 'reservation/cancelReservation/' + idReservation, {headers:this.httOptions});
  }



  //Historial de las reservaciones del Admin

  getReservationsByHotel(idHotel:string){
    return this.http.get(environment.baseUrl + 'reservation/getReservationsByHotel/'+ idHotel, {headers:this.httOptions})
  }

  generateInvoice(idReservation:string){
    return this.http.post(environment.baseUrl + 'invoice/generateInvoice/'+ idReservation, {headers:this.httOptions})
  }

  getInvoices(username: any){
    
    return this.http.get(environment.baseUrl + 'invoice/getInvoices/'+ username, {headers:this.httOptions}) 
  }

}
