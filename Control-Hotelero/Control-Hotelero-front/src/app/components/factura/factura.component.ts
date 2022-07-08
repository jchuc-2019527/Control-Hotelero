import { Component, OnInit } from '@angular/core';
import { AdminAppRestService } from 'src/app/services/adminAppRest/admin-app-rest.service';
import { ReservationResService } from 'src/app/services/reservationRes/reservation-res.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  username:any;
  room:any;
  arrayInvoce: any;
  search: any;

  constructor(
    private adminAppRest :AdminAppRestService,
    private reservationRest: ReservationResService

  ) { 
  }

  ngOnInit(): void {
    this.username = this.adminAppRest.getIdentity().username;
    this.getInvoices();
  }

  getInvoices(){
    this.reservationRest.getInvoices(this.username).subscribe({
      next:(res:any)=>{
        this.arrayInvoce = res.invoices;
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  }

}
