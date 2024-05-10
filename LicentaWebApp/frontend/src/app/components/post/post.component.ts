import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../client/client';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() postResponse: PostResponse | undefined;

  constructor() { }

  ngOnInit() {
  }


}
