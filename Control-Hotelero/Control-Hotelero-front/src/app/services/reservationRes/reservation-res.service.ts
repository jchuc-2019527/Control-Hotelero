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

  getReservations(){
    return this.http.get(environment.baseUrl + 'reservation/getReservations', {headers:this.httOptions})
  }


}
