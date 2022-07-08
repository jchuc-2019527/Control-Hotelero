import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchF'
})
export class SearchFPipe implements PipeTransform {

  
  transform(invoice:any, search:any){
    if(search == undefined){
      return invoice;
    }else{
      return invoice.filter( (invoice:any) => {
        return invoice.hotel.toLowerCase().includes(search.toLowerCase())

      })
    }
  };

}
