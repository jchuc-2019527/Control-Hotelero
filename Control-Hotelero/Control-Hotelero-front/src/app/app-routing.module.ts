import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HomeComponent } from './components/home/home.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { HistorialComponent } from './components/historial/historial.component';
import { InfoHotelsComponent } from './components/info-hotels/info-hotels.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'hoteles', component: HotelesComponent},
  {path: 'dataHotels/:id', component:InfoHotelsComponent},
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'historial', component: HistorialComponent},
  {path: 'reservationRoom/:id', component:ReservationRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
