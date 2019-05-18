import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { VehicleTableComponent } from './vehicletable.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    VehicleTableComponent,
  ],
})
export class VehicleTableModule { }
