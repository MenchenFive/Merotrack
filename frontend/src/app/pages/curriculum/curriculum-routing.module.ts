import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumBoardComponent } from './curriculum.component';
import { CVPersonTableComponent } from './cv-person-table/cv-person-table.component';
import { CvPersonEditorComponent } from './cv-person-editor/cv-person-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CurriculumBoardComponent,
    children: [
      {
        path: 'editor',
        component: CvPersonEditorComponent,
      }, {
        path: 'list',
        component: CVPersonTableComponent,
      }, {
        path: '',
        redirectTo: 'list',
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class CurriculumRoutingModule { }
