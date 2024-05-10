import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Input() title!: string;
  @Input() showHeader: boolean = true;
  @Output() closeModalEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  hideModal() {
    this.closeModalEmitter.emit();
  }
}
