import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { BoardButtonComponent } from './components/board-button/board-button.component';
import {BoardModalModule} from "./components/board-modal/board-modal.module";
import {TextEditableDirective} from "../../shared/directives/text-editable.directive";
import {DirectivesModule} from "../../shared/directives/directives.module";
import {RouterModule} from "@angular/router";
import {ControlsBarModule} from "../../shared/components/controls-bar/controls-bar.module";
import {PipesModule} from "../../shared/pipes/pipes.module";



@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardButtonComponent,
  ],
  imports: [
    CommonModule,
    BoardModalModule,
    DirectivesModule,
    RouterModule,
    ControlsBarModule,
    PipesModule
  ],
})
export class DashboardModule { }
