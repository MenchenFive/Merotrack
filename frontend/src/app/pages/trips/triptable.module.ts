import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ThemeModule } from '../../@theme/theme.module';
import { TripTableComponent } from './triptable.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PipesModule } from '../../@core/data/pipes/pipes.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaproutingdialogComponent } from './maproutingdialog/maproutingdialog.component';
import { NbDialogService, NbDialogModule } from '@nebular/theme';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AutoCompleteModule,
    LeafletModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    TripTableComponent,
    MaproutingdialogComponent,
  ],
  entryComponents: [
    MaproutingdialogComponent,
  ]
})
export class TripTableModule { }
