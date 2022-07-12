import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  hotels:any

  chartOptions1 = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
    }
  };
  chartLabels1: any = [];
  chartLegend1 = true;
  chartPlugins1 = [];

  chartData1: any = [{
     data: [

     ], 
     label: 'SOLICITUD DE HOTELES' 
    }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

  constructor(
    private hotelRest: HotelRestService
  ) { }

  ngOnInit(): void {
    this.getHotels()
  }

  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next:(res:any)=>{
        this.hotels = res.hoteles;

        this.hotels.forEach((hotel: any) => {
            this.chartLabels1.push(hotel.nameHotel);
            this.chartData1[0].data.push(hotel.request);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
        });
      },
      error: (err) => console.log(err.error.message || err.error)
    })
  };

}
