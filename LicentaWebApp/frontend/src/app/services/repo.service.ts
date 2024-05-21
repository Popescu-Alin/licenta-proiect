import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import {
  AddToRepoResponse,
  Client,
  Repository,
  RepositoryResponse,
} from '../client/client';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getReposByUserId(userId: string): Promise<RepositoryResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getReposByUserId(userId).toPromise();
  }

  addRepo(repo: Repository): Promise<Repository | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addRepo(repo).toPromise();
  }

  getAccessibleRepos(
    userId: string,
    postId: string
  ): Promise<AddToRepoResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getEditableReposByUserId(userId, postId).toPromise();
  }

  addPostToRepo(
    repoId: string,
    postId: string
  ): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addPostToRepo(repoId, postId).toPromise();
  }

  removePostFromRepo(repoId: string, postId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.removePostFromRepo(repoId, postId).toPromise();
  }
}
