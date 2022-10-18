import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {ControlsBarService} from "../../../services/controls-bar.service";
import {FilterBy, SortBy, SortType} from "../../types/sort.types";

@Component({
  selector: 'app-controls-bar',
  templateUrl: './controls-bar.component.html',
  styleUrls: ['./controls-bar.component.scss']
})
export class ControlsBarComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  @Input() addFilterType: boolean = false;

  filterWord: string = '';
  filterBy: FilterBy = 'board'
  sortBy: SortBy = 'name';
  sortType: SortType = 'ASC';

  constructor(
    public controlsBarService: ControlsBarService
  ) { }

  submitFilterChanges() {
    this.controlsBarService.filterWord = this.filterWord;
  }

  submitFilterByChanges() {
    this.controlsBarService.filterBy = this.filterBy;
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
