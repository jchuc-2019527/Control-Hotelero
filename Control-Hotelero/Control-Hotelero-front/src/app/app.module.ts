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
import { ReservationDatesComponent } from './components/reservation-dates/reservation-dates.component';
import { ReservationServiceComponent } from './components/reservation-service/reservation-service.component';
import { HistorialAdminHotelComponent } from './components/historial-admin-hotel/historial-admin-hotel.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { SearchDirectionPipe } from './pipes/search-direction.pipe';
import { SearchUhPipe } from './pipes/search-uh.pipe';
import { FacturaComponent } from './components/factura/factura.component';
import { SearchFPipe } from './pipes/search-f.pipe';
import { UsersComponent } from './components/users/users.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { ChartsModule } from '@rinminase/ng-charts';

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
    PorfilComponent,
    ReservationDatesComponent,
    ReservationServiceComponent,
    HistorialAdminHotelComponent,
    SearchPipe,
    SearchUserPipe,
    SearchDirectionPipe,
    SearchUhPipe,
    FacturaComponent,
    SearchFPipe,
    UsersComponent,
    GraphicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
