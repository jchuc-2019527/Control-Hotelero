import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

transform(hotel:any, search:any){
    if(search == undefined){
      return hotel;
    }else{
      return hotel.filter( (hotel:any) => {
        return hotel.nameHotel.toLowerCase().includes(search.toLowerCase())

      })
    }
  };

}
