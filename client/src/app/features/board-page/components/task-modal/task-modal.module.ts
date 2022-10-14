import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './task-modal.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TaskModalComponent
  ],
  exports: [
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TaskModalModule { }
