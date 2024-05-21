import { Component, Input, OnInit } from '@angular/core';
import { Repository, RepositoryResponse } from '../../client/client';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss']
})
export class ReposListComponent implements OnInit {

  @Input() repositorysResponses: RepositoryResponse[] | undefined;

  isModalOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  
  repositoryEmitter(repository: Repository) {
    console.log(repository);
    let repositoryResponse: RepositoryResponse = new RepositoryResponse({
      repository: repository,
      numberOfUsers: 1,
      numberOfPosts: 0,
    });

    if(!this.repositorysResponses) {
      this.repositorysResponses = [];
    }
    this.repositorysResponses.push(repositoryResponse);
  }

}
