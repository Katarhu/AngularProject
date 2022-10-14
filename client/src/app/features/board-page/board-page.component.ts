import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ListService} from "./services/list.service";
import {TaskService} from "./services/task.service";

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {

  title?: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    public listService: ListService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value: any) => {
      const { id } = value;

      this.listService.init(id).subscribe((boardName) => this.title = boardName);
      this.taskService.init(id);
    })
  }

  ngOnDestroy() {
    this.taskService.clear();
    this.listService.clear();
  }
}
