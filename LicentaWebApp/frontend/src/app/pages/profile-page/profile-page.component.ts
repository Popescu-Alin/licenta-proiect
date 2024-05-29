import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { DataReciverService } from '../../services/data-reciver.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  postResponses: PostResponse[] | undefined;
  reposResponses: RepositoryResponse[] | undefined;

  userData: UserProfileDTO | undefined;
  isLoadingPosts = false;
  isLoadingUser = false;
  isPostListShown = true;
  isLoadingRepos = false;
  userId: string | null = null;
  pathSubscription: Subscription | undefined;
  appUserId: string | undefined;

  constructor(
    private postService: PostService,
    private alertService: CustomAlertService,
    private userService: UserService,
    private changesDetectRef: ChangeDetectorRef,
    private repoService: RepoService,
    private route: ActivatedRoute,
    private dataReciver: DataReciverService,
  ) {}


  ngOnInit(): void {
    this.appUserId = this.dataReciver.getApplicationUserId();
    this.pathSubscription = this.route.paramMap.subscribe(params => {
      this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUserData();
    this.loadPosts();
    });
  }

  async loadUserData() {
    if(!this.userId){
      return;
    }
    this.isLoadingUser = true;
    try {
      this.userData = await this.userService.getUserProfile(this.userId!);
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
      this.postResponses = await this.postService.getPostsByUserId(11,0,this.userId!);
    } catch (error) {
      this.postResponses = undefined;
    } finally {
      this.isLoadingPosts = false;
      this.changesDetectRef.detectChanges();
    }
  }

  async loadRepos() {
    if (!this.userData) {
      return;
    }
    this.isLoadingRepos = true;
    try {
      this.reposResponses = await this.repoService.getReposByUserId(this.userId!);
    } catch (error) {
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

  ngOnDestroy(): void {
   if(this.pathSubscription)
      this.pathSubscription.unsubscribe();
  }

}
