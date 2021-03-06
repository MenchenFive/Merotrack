import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { VehicleTableComponent } from './vehicletable.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AutoCompleteModule,
  ],
  declarations: [
    VehicleTableComponent,
  ],
})
export class VehicleTableModule { }
