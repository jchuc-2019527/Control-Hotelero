import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminAppRestService {
  httOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })

  constructor(
    private http: HttpClient,
  ) { }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken
    }else{
      token= '';
    }
    return token;
  };

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity
  };

  getUsersbyAdmin(){
    return this.http.get(environment.baseUrl + 'adminApp/getUsersbyAdmin' , {headers: this.httOptions.set('Authorization', this.getToken())});
  };
}
