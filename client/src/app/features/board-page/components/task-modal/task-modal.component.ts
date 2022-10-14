import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";

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
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  modalClick(e: Event) {
    e.stopPropagation();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  submitForm() {
    if( this.modalForm.valid ) {
      this.taskService.createTask({
        name: this.modalForm.controls.name.value as string,
        listId: this.listId,
        boardId: this.boardId
      })
    }
    this.closeModal();
  }

  get nameError() {
    return this.modalForm.controls.name.errors;
  }
}
