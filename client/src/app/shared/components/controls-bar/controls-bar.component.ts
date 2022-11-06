import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlsBarService} from "../../../services/controls-bar.service";
import {FilterBy, SortBy, SortType} from "../../types/sort.types";

@Component({
  selector: 'app-controls-bar',
  templateUrl: './controls-bar.component.html',
  styleUrls: ['./controls-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsBarComponent implements OnInit, OnDestroy {

  @Input() title: string = '';
  @Input() addFilterType: boolean = false;

  filterWord: string = '';
  filterBy: FilterBy;
  sortBy: SortBy;
  sortType: SortType;

  constructor(
    public controlsBarService: ControlsBarService
  ) {
    this.filterBy = this.controlsBarService.filterState.filterBy
    this.sortBy = this.controlsBarService.filterState.sortBy
    this.sortType = this.controlsBarService.filterState.sortType
  }

  submitFilterChanges() {
    this.controlsBarService.setFilterWord(this.filterWord);
  }

  submitFilterByChanges() {
    this.controlsBarService.setFilterBy(this.filterBy);
  }

  submitSortByChanges() {
    this.controlsBarService.setSortBy(this.sortBy);
  }

  submitSortTypeChanges() {
    this.controlsBarService.setSortType(this.sortType);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.controlsBarService.clear();
  }

}
