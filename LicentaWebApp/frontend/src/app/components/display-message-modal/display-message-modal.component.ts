import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-display-message-modal',
  templateUrl: './display-message-modal.component.html',
  styleUrls: ['./display-message-modal.component.scss']
})
export class DisplayMessageModalComponent implements OnInit {

  @Input() isModalOpen!: boolean ;
  @Output() closeModalEmitter = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
