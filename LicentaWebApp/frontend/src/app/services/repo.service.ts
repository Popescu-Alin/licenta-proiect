import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import {
  AddToRepoResponse,
  BasicUserInfo,
  Client,
  PostResponse,
  RepoUserBasicInfo,
  Repository,
  RepositoryPageResponse,
  RepositoryResponse,
  UserRepository,
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

  getRepoUsers(repoId: string): Promise<RepoUserBasicInfo[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getUserRepos(repoId).toPromise();
  }

  addRepoUser(body: UserRepository): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addUserToRepo(body).toPromise();
  }

  removeRepoUser(repoId: string, userId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.deleteUserRepo(userId,repoId).toPromise();
  }

  updateRepoUser(userRepo:UserRepository): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.updateUserRepo(userRepo).toPromise();
  }

  getPostsByRepoId(repoId: string): Promise<PostResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getRepoPosts(repoId).toPromise();
  }

  getAccesibleReposforUserProfile(userId: string): Promise<RepositoryResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getAccesibleUserProfileRepos(userId).toPromise();
  }

  getRepo(repoId: string): Promise<RepositoryPageResponse | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getRepo(repoId).toPromise();
  }

  updateRepo(repo: Repository): Promise<Repository | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.updateRepo(repo.id!, repo).toPromise();
  }

  deleteRepo(repoId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.deleteRepo(repoId).toPromise();
  }
}
