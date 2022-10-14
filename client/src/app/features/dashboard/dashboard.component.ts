import {Component, OnDestroy, OnInit} from '@angular/core';
import {BoardService} from "./services/board.service";
import {SortBy} from "../../shared/types/sort.types";
import {ControlsBarService} from "../../services/controls-bar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isAddBoard = false;

  constructor(
    public boardService: BoardService,
    public controlsBarService: ControlsBarService
  ) { }

  ngOnInit(): void {
    this.boardService.init();
  }

  openModal() {
    this.isAddBoard = true;
  }

  closeModal() {
    this.isAddBoard = false;
  }
}
