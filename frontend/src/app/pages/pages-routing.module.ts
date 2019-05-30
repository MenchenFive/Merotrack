import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { MapsComponent } from './maps/maps.component';
import { VehicleTableComponent } from './vehicles/vehicletable.component';
import { IncidenceTableComponent } from './incidences/incidencetable.component';
import { TripTableComponent } from './trips/triptable.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AddressTableComponent } from './address/addresstable.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'vehicles',
      component: VehicleTableComponent,
    },
    {
      path: 'maps',
      component: MapsComponent,
    },
    {
      path: 'users',
      component: AddressTableComponent,
    },
    {
      path: 'incidences',
      component: IncidenceTableComponent,
    },
    {
      path: 'trips',
      component: TripTableComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      component: TripTableComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
