import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlsBarService} from "../../../services/controls-bar.service";
import {SortBy, SortType} from "../../types/sort.types";

@Component({
  selector: 'app-controls-bar',
  templateUrl: './controls-bar.component.html',
  styleUrls: ['./controls-bar.component.scss']
})
export class ControlsBarComponent implements OnInit, OnDestroy {

  @Input() title: string = '';

  filterWord: string = '';
  sortBy: SortBy = 'name';
  sortType: SortType = 'ASC';

  constructor(
    public controlsBarService: ControlsBarService
  ) { }

  submitFilterChanges() {
    this.controlsBarService.filterWord = this.filterWord;
  }

  submitSortByChanges() {
    this.controlsBarService.sortBy = this.sortBy;
  }

  submitSortTypeChanges() {
    this.controlsBarService.sortType = this.sortType;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.controlsBarService.clear();
  }

}
