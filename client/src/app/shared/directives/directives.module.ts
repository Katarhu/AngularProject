import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextEditableDirective} from "./text-editable.directive";



@NgModule({
  declarations: [
    TextEditableDirective
  ],
  exports: [
    TextEditableDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
