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

  //Reservation:

  createReservation(idClient:string,idHotel:string, params:any){
    return this.http.post(environment.baseUrl + 'reservation/addReservation/' + idClient +'/'+ idHotel, params, {headers:this.httOptions});
  };

  updateToom(idReservation: string, room: any){
    let body = JSON.stringify({room})
    return this.http.put(environment.baseUrl + 'reservation/updateRoom/' + idReservation, body, {headers:this.httOptions});
  };


  getRooms(idHotel: string){
      return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel, {headers:this.httOptions})
  };
  

  getReservations(){
    return this.http.get(environment.baseUrl + 'reservation/getReservations', {headers:this.httOptions})
  }


}
