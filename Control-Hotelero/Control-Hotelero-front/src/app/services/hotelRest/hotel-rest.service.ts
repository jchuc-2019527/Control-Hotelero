import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';
import { AdminAppRestService } from '../adminAppRest/admin-app-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.adminApp.getToken()
  })
  constructor(
    private http: HttpClient,
    private userRest: UserRestService,
    private adminApp: AdminAppRestService
  ) { }

  getHotels(){
    return this.http.get(environment.baseUrl + 'hotel/getHoteles', {headers:this.httOptions});
  };

  addHotel(params: {}){
    return this.http.post(environment.baseUrl + 'hotel/addHotel' ,params, {headers:this.httOptions});
  };

}
