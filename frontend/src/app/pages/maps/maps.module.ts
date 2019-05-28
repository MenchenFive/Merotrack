import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { MapsComponent } from './maps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
    AutoCompleteModule
  ],
  declarations: [
    MapsComponent,
  ],
})
export class MapsModule { }
