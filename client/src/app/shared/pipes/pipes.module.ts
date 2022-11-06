import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TruncatePipe} from "./truncate.pipe";
import {FilterNamePipe} from './filter-name.pipe';
import {SortPipe} from './sort.pipe';
import {FilterBoardPipe} from './filter-board.pipe';
import {SortBoardsPipe} from './sort-boards.pipe';


@NgModule({
  declarations: [
    TruncatePipe,
    FilterNamePipe,
    SortPipe,
    FilterBoardPipe,
    SortBoardsPipe
  ],
  exports: [
    TruncatePipe,
    FilterNamePipe,
    SortPipe,
    FilterBoardPipe,
    SortBoardsPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule {
}
