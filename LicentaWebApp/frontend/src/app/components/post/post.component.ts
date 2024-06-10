import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../../client/client';
import { LikeDislikeService } from '../../services/like-dislike.service';
import { Router } from '@angular/router';
import { UrlUtil } from '../../utils/url-util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postResponse: PostResponse | undefined;
  savePanelOpen: boolean = false;
  urlUtil = UrlUtil

  constructor(
    private likeDislikeService: LikeDislikeService,
    private changeDdtectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {}

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
    this.changeDdtectorRef.detectChanges();
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

  redirectToPost(postId: string | undefined) {
    if (postId) {
      this.router.navigate(['/post', postId]);
    }
  }

  

}
