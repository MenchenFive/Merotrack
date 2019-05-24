import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElipsisPipe } from './elipsis.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ElipsisPipe
  ],
  exports: [
    ElipsisPipe
  ]
})
export class PipesModule { }
