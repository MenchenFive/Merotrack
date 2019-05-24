import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { IncidenceTableModule } from './incidences/incidencetable.module';
import { MapsModule } from './maps/maps.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { TripTableModule } from './trips/triptable.module';
import { VehicleTableModule } from './vehicles/vehicletable.module';
import { AddressTableModule } from './address/addresstable.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MapsModule,
    MiscellaneousModule,
    VehicleTableModule,
    IncidenceTableModule,
    TripTableModule,
    AddressTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
