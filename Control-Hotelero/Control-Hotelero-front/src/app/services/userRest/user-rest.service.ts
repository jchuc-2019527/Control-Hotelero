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

  //Cliente

  getUser(idCliente:string){
    return this.http.get(environment.baseUrl + 'user/getUser/' + idCliente, {headers:this.httpOptions})
  }
  updateUser(idCliente:string, params:{}){
    return this.http.put(environment.baseUrl + 'user/updateUser/' + idCliente, params, {headers:this.httpOptions})
  };

  deleteUser(idCliente:string){
    return this.http.delete(environment.baseUrl + 'user/deleteUser/' + idCliente, {headers:this.httpOptions})
  };


}
