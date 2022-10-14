import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appTextEditable]'
})
export class TextEditableDirective implements AfterViewInit {

  previousInputValue: string = '';

  @Input() maxLength: number = Number.MAX_SAFE_INTEGER;
  @Output() commitChangesEvent = new EventEmitter();

  @HostListener('focus')
  onFocus() {
    this.$el.nativeElement.classList.add('focused')
    this.previousInputValue = this.$el.nativeElement.textContent;
  }

  @HostListener('blur')
  onBlur() {
    this.$el.nativeElement.classList.remove('focused');
    this.commitChanges();
  }

  @HostListener('keydown', ['$event.key'])
  keyPress(key: string) {
    if( key === 'Enter') {
      this.$el.nativeElement.blur();
    }
  }

  constructor(
    private $el: ElementRef
  ) {}


  ngAfterViewInit() {
    this.$el.nativeElement.setAttribute('contenteditable', true);
  }

  commitChanges() {
    if( this.$el.nativeElement.textContent.length > this.maxLength ) {
      this.$el.nativeElement.textContent = this.previousInputValue;
      alert(`Name should be less than ${this.maxLength} symbols`)
    }

    if( this.previousInputValue !== this.$el.nativeElement.textContent ) {
      this.commitChangesEvent.emit(this.$el.nativeElement.textContent.trim());
    }
  }

}
