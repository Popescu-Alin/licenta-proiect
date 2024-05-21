import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  PostResponse,
  RepositoryResponse,
  UserProfileDTO,
} from '../../client/client';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  postResponses: PostResponse[] | undefined;
  reposResponses: RepositoryResponse[] | undefined;

  userData: UserProfileDTO | undefined;
  isLoadingPosts = false;
  isLoadingUser = false;
  isPostListShown = true;
  isLoadingRepos = false;

  constructor(
    private postService: PostService,
    private alertService: CustomAlertService,
    private userService: UserService,
    private changesDetectRef: ChangeDetectorRef,
    private repoService: RepoService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    this.isLoadingUser = true;
    try {
      this.userData = await this.userService.getUserProfile();
      this.loadPosts();
    } catch (error) {
      this.userData = undefined;
      this.alertService.errorSnackBar('Failed to load user profile data.');
    } finally {
      this.isLoadingUser = false;
      this.changesDetectRef.detectChanges();
    }
  }

  async loadPosts() {
    if (!this.userData) {
      return;
    }
    this.isLoadingPosts = true;
    try {
      this.postResponses = await this.postService.getPostsByUserId(11,0,this.userData.id!);
    } catch (error) {
      console.error(error);
      this.postResponses = undefined;
    } finally {
      this.isLoadingPosts = false;
      this.changesDetectRef.detectChanges();
    }
  }

  async loadRepos() {
    this.isLoadingRepos = true;
    if (!this.userData) {
      return;
    }
    try {
      this.reposResponses = await this.repoService.getReposByUserId(this.userData.id!);
    } catch (error) {
      console.error(error);
      this.userData = undefined;
    } finally {
      this.isLoadingRepos = false;
      this.changesDetectRef.detectChanges();
    }
  }

  selectPosts() {
    this.isPostListShown = true;
    this.loadPosts();
  }

  selectRepositories() {
    this.isPostListShown = false;
    this.loadRepos();
  }
}
