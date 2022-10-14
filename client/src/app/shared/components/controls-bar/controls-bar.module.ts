import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsBarComponent } from './controls-bar.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ControlsBarComponent
  ],
  exports: [
    ControlsBarComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class ControlsBarModule { }
