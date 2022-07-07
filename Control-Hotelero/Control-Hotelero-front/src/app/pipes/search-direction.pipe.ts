import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDirection'
})
export class SearchDirectionPipe implements PipeTransform {

  transform(hotel:any, search:any){
    if(search == undefined){
      return hotel;
    }else{
      return hotel.filter( (hotel:any) => {
        return hotel.direction.toLowerCase().includes(search.toLowerCase())

      })
    }
  };

}
