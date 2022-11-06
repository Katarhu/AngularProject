import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {IAppStore} from "../../../../store/app.store";
import {Observable} from "rxjs";
import {ITask} from "../../../../shared/models/task.model";
import {selectArchivedTasks} from "../../../../store/tasks/tasks.selectors";
import {ControlsBarService} from "../../../../services/controls-bar.service";

@Component({
  selector: 'app-archived-list',
  templateUrl: './archived-list.component.html',
  styleUrls: ['./archived-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchivedListComponent implements OnInit {

  @Input() boardId?: string;
  tasks$?: Observable<ITask[]>

  constructor(
    public controlsBarService: ControlsBarService,
    private store: Store<IAppStore>
  ) {
  }

  ngOnInit(): void {
    this.tasks$ = this.store.pipe(select(selectArchivedTasks(this?.boardId || '')));
  }

}
