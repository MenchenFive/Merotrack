import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxEchartsModule } from 'ngx-echarts';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { ThemeModule } from '../../@theme/theme.module';
import { CurriculumRoutingModule } from './curriculum-routing.module';
import { CurriculumBoardComponent } from './curriculum.component';
import { CvComboDoctypeComponent } from './cv-person-editor/cv-combo-doctype/cv-combo-doctype.component';
import { CvPedExperiencesComponent } from './cv-person-editor/cv-ped-experiences/cv-ped-experiences.component';
import { CvPersonEditorComponent } from './cv-person-editor/cv-person-editor.component';
import { CVPersonTableComponent } from './cv-person-table/cv-person-table.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    CurriculumRoutingModule,
    AutoCompleteModule,
  ],
  declarations: [
    CurriculumBoardComponent,
    CVPersonTableComponent,
    CvPersonEditorComponent,
    CvComboDoctypeComponent,
    CvPedExperiencesComponent,
  ],
  entryComponents: [
  ]
})
export class CurriculumBoardModule { }
