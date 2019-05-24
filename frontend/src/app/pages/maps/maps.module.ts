import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { MapsComponent } from './maps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    ThemeModule,
    LeafletModule.forRoot(),
  ],
  declarations: [
    MapsComponent,
  ],
})
export class MapsModule { }
