import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {createTask} from "../../../../store/tasks/tasks.actions";
import {IAppStore} from "../../../../store/app.store";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss', '../../../../shared/styles/modal.scss']
})
export class TaskModalComponent implements OnInit {

  @Input() listId!: string;
  @Input() boardId!: string;
  @Output() closeModalEvent = new EventEmitter();

  modalForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(12)])
  })

  constructor(
    private store: Store<IAppStore>
  ) {
  }

  get nameError() {
    return this.modalForm.controls.name.errors;
  }

  ngOnInit(): void {
  }

  modalClick(e: Event) {
    e.stopPropagation();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  submitForm() {
    if (this.modalForm.valid) {
      const name = this.modalForm.controls.name.value as string;
      const listId = this.listId;
      const boardId = this.boardId;

      this.store.dispatch(createTask({name, listId, boardId}));
    }

    this.closeModal();
  }
}
