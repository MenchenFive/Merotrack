import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ThemeModule } from '../../@theme/theme.module';
import { TripTableComponent } from './triptable.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PipesModule } from '../../@core/pipes/pipes.module';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AutoCompleteModule,
  ],
  declarations: [
    TripTableComponent,
  ],
})
export class TripTableModule { }
