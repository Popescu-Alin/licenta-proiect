import { Component, Input, OnInit } from '@angular/core';
import { Repository, RepositoryResponse } from '../../client/client';
import { AccessModifiers } from '../../constants/constants';
import { Route, Router } from '@angular/router';
import { DataReciverService } from '../../services/data-reciver.service';
import { UrlUtil } from '../../utils/url-util';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  @Input() repositoryResponse: RepositoryResponse | undefined;
  accessModifiers = AccessModifiers;

  appUserId: string | undefined;

  urlUtil = UrlUtil;

  isModalOpen = false;  
  constructor( private router: Router,
              private dataRecever: DataReciverService
  ) {
   }

  ngOnInit() {
    this.appUserId = this.dataRecever.getApplicationUserId();
  }

  openModal(){
    this.isModalOpen = true;
  }

  closeModal(){
    this.isModalOpen = false;
  }

  updateUserNumber(number: number){
    this.repositoryResponse!.numberOfUsers = number;
  }

  regirectToRepo(){
    this.router.navigate(['/repo', this.repositoryResponse!.repository!.id!]);
  }

}
