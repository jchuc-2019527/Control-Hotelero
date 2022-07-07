import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(reservation:any, search:any){
    if(search == undefined){
      return reservation;
    }else{
      return reservation.filter( (reservation:any) => {
        return reservation.user.name.toLowerCase().includes(search.toLowerCase())

      })
    }
  };

}
