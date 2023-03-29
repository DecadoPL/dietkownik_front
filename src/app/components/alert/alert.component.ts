import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message!: string;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() discard = new EventEmitter<void>();

  onCancel(){
    this.cancel.emit();
  }

  onSave(){
    this.save.emit();
  }

  onDiscard(){
    this.discard.emit();
  }
}
