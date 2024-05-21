import { Component, Input, OnChanges } from '@angular/core';
import { PostResponse } from '../../client/client';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnChanges {

  @Input() list: PostResponse[] = [];

  postList: PostResponse[] = [];
  constructor() { }

  ngOnChanges() {
    this.postList.push(...this.list);   
  }
  
  
}
