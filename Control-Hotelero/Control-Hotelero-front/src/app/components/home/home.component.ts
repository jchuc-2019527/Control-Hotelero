import { Component, OnInit } from '@angular/core';
import { adminAppModel } from 'src/app/models/adminApp.model';
import { adminHotelModel } from 'src/app/models/adminHotel.model';
import { userModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminApp : adminAppModel;
  adminHotel : adminHotelModel;
  user: userModel;

  constructor(
    public userRest: UserRestService,
    public router: Router,

  ) {
    this.adminApp = new adminAppModel('','','','','');
    this.adminHotel = new adminHotelModel('','','','','');
    this.user = new userModel('','','','','');
  }

  ngOnInit(): void {
  }

  login(loginForm: any){
    this.userRest.login(this.adminApp).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.search));
        this.router.navigateByUrl('/home');

      },
      error:(err)=>Swal.fire({
        title: err.error + '  ' + 'Error al loguearse' ,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    loginForm.reset()
  }

  register(registerForm:any){
    this.userRest.registerUser(this.user).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message + '  ' + res.user.name,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
      },
      error:(err)=>Swal.fire({
        title: err.error + '  ' + 'Error al crear cuenta' ,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
    registerForm.reset()
  }

}

