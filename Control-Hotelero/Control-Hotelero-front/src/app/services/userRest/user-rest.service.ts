import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })

  constructor(
    private http: HttpClient
  ) {}

  login(params:{}){
    return this.http.post(environment.baseUrl + 'user/login', params, {headers:this.httpOptions})
  };

  registerUser(params: {}){
    return this.http.post(environment.baseUrl + 'user/registerUser' ,params, {headers: this.httpOptions});
  };

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

}
