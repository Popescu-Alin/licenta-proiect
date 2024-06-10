import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UrlUtil } from '../../utils/url-util';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataReciverService } from '../../services/data-reciver.service';
import { RepoService } from '../../services/repo.service';
import { PostResponse, RepositoryPageResponse } from '../../client/client';
import { ErrorUtil } from '../../utils/error-util';
import { LikeDislikeService } from '../../services/like-dislike.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessModifiers } from '../../constants/constants';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-repo-page',
  templateUrl: './repo-page.component.html',
  styleUrls: ['./repo-page.component.scss'],
})
export class RepoPageComponent implements OnInit {
  isLoadingPosts = false;
  isRepoLoading = false;
  isEditMode = false;
  isDeleting = false;

  accessModifiers = AccessModifiers;

  urlUtil = UrlUtil;
  repoId: string | null = null;
  pathSubscription: Subscription | undefined;
  appUserId: string | undefined;

  postResponses: PostResponse[] | undefined = [];

  repo: RepositoryPageResponse | undefined;

  repoForm!: FormGroup;
  constructor(
    private repoService: RepoService,
    private alertService: CustomAlertService,
    private changeDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataReciver: DataReciverService,
    private router: Router,
    private likeDislikeService: LikeDislikeService,
    private formBuilder: FormBuilder,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Repositeory');
  }

  ngOnInit(): void {
    this.appUserId = this.dataReciver.getApplicationUserId();
    this.pathSubscription = this.route.paramMap.subscribe((params) => {
      this.repoId = this.route.snapshot.paramMap.get('id');
      this.loadPosts();
      this.loadRepo();
    });
  }

  initForm() {
    this.repoForm = this.formBuilder.group({
      title: [this.repo?.repository?.title, [Validators.required]],
      accessModifier: [
        this.repo?.repository?.accessModifier,
        [Validators.required],
      ],
    });
  }

  async loadRepo() {
    if (!this.repoId) {
      return;
    }
    this.isRepoLoading = true;
    try {
      this.repo = await this.repoService.getRepo(this.repoId);
      this.initForm();
    } catch (error: any | unknown) {
      if (ErrorUtil.is404ErrorNswag(error)) {
        this.router.navigate(['/404']);
      } else {
        if (ErrorUtil.is403ErrorNswag(error)) {
          this.router.navigate(['/403']);
        } else {
          this.alertService.genericErrorMessage();
          console.error(error);
        }
      }
    } finally {
      this.isRepoLoading = false;
    }
  }

  async loadPosts() {
    if (!this.repoId) {
      return;
    }
    this.isLoadingPosts = true;
    try {
      this.postResponses = await this.repoService.getPostsByRepoId(this.repoId);
    } catch (error: any | unknown) {
      this.postResponses = undefined;
      this.alertService.genericErrorMessage();
    } finally {
      this.isLoadingPosts = false;
      this.changeDetectRef.detectChanges();
    }
  }

  async removePost(postId: string) {
    if (!this.repoId) {
      return;
    }
    try {
      await this.repoService.removePostFromRepo(this.repoId, postId);
      this.postResponses = this.postResponses?.filter(
        (post) => post.post!.id !== postId
      );
    } catch {
      this.alertService.genericErrorMessage();
    }
  }

  async likeDislikePost(postId: string) {
    let postResponse = this.postResponses?.find(
      (post) => post.post!.id === postId
    );
    if (!postResponse) {
      return;
    }

    if (postResponse.isLiked) {
      postResponse.isLiked! = false;
      postResponse.numberOfLikes! -= 1;
      try {
        await this.likeDislikeService.dislikePost(postResponse.post!.id!);
      } catch (e) {
        postResponse.isLiked! = true;
        postResponse.numberOfLikes! += 1;
      }
    } else {
      postResponse.isLiked! = true;
      postResponse.numberOfLikes! += 1;
      try {
        await this.likeDislikeService.likePost(postResponse.post!.id!);
      } catch (e) {
        postResponse.isLiked! = false;
        postResponse.numberOfLikes! -= 1;
      }
    }
    this.changeDetectRef.detectChanges();
  }

  redirectToPost(postId: string | undefined) {
    if (postId) {
      this.router.navigate(['/post', postId]);
    }
  }

  openEditMode() {
    this.isEditMode = true;
  }

  closeEditMode() {
    this.isEditMode = false;
    this.initForm();
  }

  async saveRepo() {
    if (this.repoForm.invalid) {
      return;
    }
    this.isEditMode = false;
    this.repo!.repository!.title = this.repoForm.value.title;
    this.repo!.repository!.accessModifier = this.repoForm.value.accessModifier;
    try {
      await this.repoService.updateRepo(this.repo?.repository!);
    } catch {
      this.alertService.genericErrorMessage();
    }
  }

  async deleteRepo() {
    if (this.isDeleting) return;
    this.isDeleting = true;
    try {
      await this.repoService.deleteRepo(this.repoId!);
      this.router.navigate(['/home']);
    } catch {
      this.alertService.genericErrorMessage();
    } finally {
      this.isDeleting = false;
    }
  }

  ngOnDestroy(): void {
    if (this.pathSubscription) this.pathSubscription.unsubscribe();
  }
}
