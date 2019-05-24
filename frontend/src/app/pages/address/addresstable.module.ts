import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AddressTableComponent } from './addresstable.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AutoCompleteModule,
  ],
  declarations: [
    AddressTableComponent,
  ],
})
export class AddressTableModule { }
