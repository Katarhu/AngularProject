import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardModalComponent } from './board-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BoardModalComponent
  ],
  exports: [
    BoardModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class BoardModalModule { }
