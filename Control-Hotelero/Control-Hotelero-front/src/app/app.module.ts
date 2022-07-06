import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { InfoHotelsComponent } from './components/info-hotels/info-hotels.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { HistorialComponent } from './components/historial/historial.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';
import { PorfilComponent } from './components/porfil/porfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HotelesComponent,
    InfoHotelsComponent,
    BienvenidaComponent,
    HistorialComponent,
    ReservationRoomComponent,
    PorfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
