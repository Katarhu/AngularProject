import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-button',
  templateUrl: './board-button.component.html',
  styleUrls: ['./board-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
