import {Component, Input, OnInit} from '@angular/core';
import {IBoard, IBoardWithLists} from "../../../../shared/types/board.types";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board?: IBoardWithLists;

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
  }

  changeBoardName(name: string) {
    this.boardService.updateBoardName(this.board!._id, name.trim());
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.board!._id);
  }

  get createdAt() {
    const date = new Date(this.board?.createdAt ?? '');
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  }
}
