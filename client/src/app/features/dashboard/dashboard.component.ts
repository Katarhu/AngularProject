import {ControlsBarService} from "../../services/controls-bar.service";
import {selectBoards} from "../../store/boards/board.selectors";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IBoard} from "../../shared/models/board.model";
import {IAppStore} from "../../store/app.store";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isAddBoard = false;
  boards$!: Observable<IBoard[]>;

  constructor(
    public controlsBarService: ControlsBarService,
    private store: Store<IAppStore>
  ) {
  }

  ngOnInit(): void {
    this.boards$ = this.store.pipe(select(selectBoards));
  }

  ngOnDestroy() {
    this.controlsBarService.clear();
  }

  openModal() {
    this.isAddBoard = true;
  }

  closeModal() {
    this.isAddBoard = false;
  }
}
