import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostResponse } from '../../client/client';

@Component({
  selector: 'app-full-page-post-modal',
  templateUrl: './full-page-post-modal.component.html',
  styleUrls: ['./full-page-post-modal.component.scss']
})
export class FullPagePostModalComponent implements OnInit {

  @Input() isModalOpen!: boolean ;
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() repositoryEmitter = new EventEmitter<PostResponse>();
  @Input() post!: PostResponse;

  constructor() { }

  ngOnInit() {
  }



}
