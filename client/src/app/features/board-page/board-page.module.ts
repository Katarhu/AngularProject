import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardPageComponent } from './board-page.component';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import {ControlsBarModule} from "../../shared/components/controls-bar/controls-bar.module";
import {TaskModalModule} from "./components/task-modal/task-modal.module";
import {DirectivesModule} from "../../shared/directives/directives.module";
import {PipesModule} from "../../shared/pipes/pipes.module";
import { ArchivedListComponent } from './components/archived-list/archived-list.component';



@NgModule({
  declarations: [
    BoardPageComponent,
    ListComponent,
    TaskComponent,
    ArchivedListComponent
  ],
  imports: [
    CommonModule,
    ControlsBarModule,
    TaskModalModule,
    DirectivesModule,
    PipesModule
  ]
})
export class BoardPageModule { }
