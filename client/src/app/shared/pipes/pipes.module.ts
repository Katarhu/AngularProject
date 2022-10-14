import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TruncatePipe} from "./truncate.pipe";
import { FilterNamePipe } from './filter-name.pipe';
import { SortPipe } from './sort.pipe';



@NgModule({
  declarations: [
    TruncatePipe,
    FilterNamePipe,
    SortPipe
  ],
  exports: [
    TruncatePipe,
    FilterNamePipe,
    SortPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
