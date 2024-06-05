import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostResponse } from '../../client/client';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataReciverService } from '../../services/data-reciver.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorUtil } from '../../utils/error-util';
import { LikeDislikeService } from '../../services/like-dislike.service';
import { UrlUtil } from '../../utils/url-util';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  postResponse: PostResponse | undefined;
  isLoadingPost = false;
  isLoadingSubComments = false;
  urlUtil = UrlUtil
  postId: string | null = null;
  pathSubscription: Subscription | undefined;
  appUserId: string | undefined;
  savePanelOpen: boolean = false;

  isDescriptionOpen = false;

  constructor(
    private postService: PostService,
    private alertService: CustomAlertService,
    private changeDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataReciver: DataReciverService,
    private router: Router,
    private likeDislikeService: LikeDislikeService
  ) {}

  ngOnInit(): void {
    this.appUserId = this.dataReciver.getApplicationUserId();
    this.pathSubscription = this.route.paramMap.subscribe((params) => {
      this.postId = this.route.snapshot.paramMap.get('id');
      this.loadPost();
    });
  }

  async loadPost() {
    if (!this.postId) {
      return;
    }
    this.isLoadingPost = true;
    try {
      this.postResponse = await this.postService.getPost(this.postId);
    } catch (error) {
      if (ErrorUtil.is404Error(error)) {
        this.router.navigate(['/404']);
      } else {
        this.postResponse = undefined;
        this.alertService.genericErrorMessage();
      }
    } finally {
      this.isLoadingPost = false;
      this.changeDetectRef.detectChanges();
    }
  }

  async likeDislikePost() {
    if (!this.postResponse) {
      return;
    }
    if (this.postResponse.isLiked) {
      this.postResponse.isLiked! = false;
      this.postResponse.numberOfLikes! -= 1;
      try {
        await this.likeDislikeService.dislikePost(this.postResponse.post!.id!);
      } catch (e) {
        this.postResponse.isLiked! = true;
        this.postResponse.numberOfLikes! += 1;
      }
    } else {
      this.postResponse.isLiked! = true;
      this.postResponse.numberOfLikes! += 1;
      try {
        await this.likeDislikeService.likePost(this.postResponse.post!.id!);
      } catch (e) {
        this.postResponse.isLiked! = false;
        this.postResponse.numberOfLikes! -= 1;
      }
    }
    this.changeDetectRef.detectChanges();
  }

  openSavePanel() {
    this.savePanelOpen = true;
  }

  closeSavePanel() {
    this.savePanelOpen = false;
  }

  updateSaveStatus(status: boolean) {
    this.postResponse!.isSaved = status;
  }
  
  ngOnDestroy(): void {
    if (this.pathSubscription) this.pathSubscription.unsubscribe();
  }

  openDescription() {
    this.isDescriptionOpen = true;
  }

  closeDescription() {
    this.isDescriptionOpen = false;
  }
}
