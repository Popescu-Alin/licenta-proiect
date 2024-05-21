import { Component, Input, OnInit } from '@angular/core';
import { Repository, RepositoryResponse } from '../../client/client';
import { AccessModifiers } from '../../constants/constants';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  @Input() repositoryResponse: RepositoryResponse | undefined;
  accessModifiers = AccessModifiers;
  constructor() { }

  ngOnInit() {
  }

}
