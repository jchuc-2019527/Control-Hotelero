import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUh'
})
export class SearchUhPipe implements PipeTransform {

  transform(reservation:any, search:any){
    if(search == undefined){
      return reservation;
    }else{
      return reservation.filter( (reservation:any) => {
        return reservation.hotel.nameHotel.toLowerCase().includes(search.toLowerCase())

      })
    }
  };

}
