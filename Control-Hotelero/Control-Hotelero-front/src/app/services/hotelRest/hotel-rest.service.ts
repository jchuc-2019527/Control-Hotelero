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
  getHotel(idHotel: string){
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + idHotel, {headers:this.httOptions});
  };
  addHotel(params: {}){
    return this.http.post(environment.baseUrl + 'hotel/addHotel' ,params, {headers:this.httOptions});
  };

  getHotelByAdmin(){
    return this.http.get(environment.baseUrl + 'hotel/getHotelByAdmin', {headers:this.httOptions})
  }

  updateHotel(idHotel:string, params:{}){
    return this.http.put(environment.baseUrl + 'hotel/updateHotel/' + idHotel, params,  {headers: this.httOptions});
   };

   deleteHotel(idHotel: string){
    return this.http.delete(environment.baseUrl + 'hotel/deleteHotel/' + idHotel, {headers: this.httOptions});
   };


/*Rooms*/

getRooms(idHotel: string){
  return this.http.get(environment.baseUrl + 'room/getRooms/' + idHotel, {headers:this.httOptions})
}

getRoom(idRoom: string){
  return this.http.get(environment.baseUrl + 'room/getRoom/' + idRoom, {headers:this.httOptions})
}


addRoom (id: string, params:{}){
  return this.http.post(environment.baseUrl + 'room/addRoom/' + id, params, {headers:this.httOptions})
};

updateRoom(id:string, params:{}){
  return this.http.put(environment.baseUrl + 'room/updateRoom/' + id, params, {headers:this.httOptions})
};

deleteRoom( id:string){
  return this.http.delete(environment.baseUrl + 'room/deleteRoom/' + id, {headers:this.httOptions})
};

/*Service */ 

getServices(idHotel: string){
  return this.http.get(environment.baseUrl + 'service/getServices/' + idHotel, {headers:this.httOptions})
}
getService(idService: string){
  return this.http.get(environment.baseUrl + 'service/getService/' + idService, {headers:this.httOptions})
}
addService (id: string, params:{}){
  return this.http.post(environment.baseUrl + 'service/addService/' + id, params, {headers:this.httOptions})
};

updateService(id:string, params:{}){
  return this.http.put(environment.baseUrl + 'service/updateService/' + id, params, {headers:this.httOptions})
};

deleteService( id:string){
  return this.http.delete(environment.baseUrl + 'service/deleteService/' + id, {headers:this.httOptions})
};


/* Eventos */

getEvents(idHotel: string){
  return this.http.get(environment.baseUrl + 'event/getEvents/' + idHotel, {headers:this.httOptions})
}

getEvent(idEvent: string){
  return this.http.get(environment.baseUrl + 'event/getEvent/' + idEvent, {headers:this.httOptions})
}

addEvent (id: string, params:{}){
  return this.http.post(environment.baseUrl + 'event/addEvent/' + id, params, {headers:this.httOptions})
};

updateEvent(id:string, params:{}){
  return this.http.put(environment.baseUrl + 'event/updateEvent/' + id, params, {headers:this.httOptions})
};

deleteEvent( id:string){
  return this.http.delete(environment.baseUrl + 'event/deleteEvent/' + id, {headers:this.httOptions})
};
  
}
