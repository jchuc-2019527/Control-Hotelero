import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
@Component({
  selector: 'app-porfil',
  templateUrl: './porfil.component.html',
  styleUrls: ['./porfil.component.css']
})
export class PorfilComponent implements OnInit {
  role: any
  idClient: any
  userUpdate:any
  user: userModel

  constructor(
    private userRest: UserRestService,
    private activateRoute: ActivatedRoute,
    private adminAppRest: AdminAppRestService,
    private router: Router
    
  ) {
    this.user = new userModel('','','','','')
   }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((idC:any)=>{
      this.idClient =idC.get('id');

      this.role = this.adminAppRest.getIdentity().role;
    });
    this.getUser()
  };

  getUser(){
    this.userRest.getUser(this.idClient).subscribe({
      next:(res:any)=>{
        this.user = res.user
        this.userUpdate = res.user;
        console.log(this.userUpdate);
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

  updateUser(updateForm: any){
    this.userUpdate.password = undefined;
    this.userUpdate.role = undefined;
    this.userRest.updateUser(this.idClient, this.userUpdate ).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          position:'center'
        })
        this.getUser()
        updateForm.reset()
      },
      error:(err)=>Swal.fire({
        title: err.error.message,
        icon: 'error',
        timer: 4000,
        position:'center'
      })
    })
  };
  

  deleteUser(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  
    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar su cuenta?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userRest.deleteUser(this.idClient).subscribe({
          next:(res:any)=>{
            this.router.navigateByUrl('/home')
            //this.getUser()
          },
        })
        swalWithBootstrapButtons.fire(
          'Cuenta eliminada!',
          'Su cuenta ha sido eliminada.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se elimino su cuenta:)',
          'error'
        )
      }
    })
  };

  

  logOut(){
    localStorage.clear(); //LIMPIA EL LOCAL STORAGE
  }

}
