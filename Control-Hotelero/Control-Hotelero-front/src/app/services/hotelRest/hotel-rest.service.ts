import { APP_ID, Injectable } from '@angular/core';
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

  /*Rooms*/

  getRooms(idHotel: string){
    return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel, {headers:this.httOptions})
  }

  getRoom(idRoom: string){
    return this.http.get(environment.baseUrl + 'room/getRoom/' + idRoom, {headers:this.httOptions})
  }


  addRoom (params:{}){
    return this.http.post(environment.baseUrl + 'room/addRoom', params, {headers:this.httOptions})
  };

  updateRoom(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'room/updateRoom/' + id, params, {headers:this.httOptions})
  };

  deleteRoom( id:string){
    return this.http.delete(environment.baseUrl + 'room/deleteRoom/' + id, {headers:this.httOptions})
  };

  
}
