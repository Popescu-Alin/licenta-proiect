import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostResponse } from '../../client/client';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { ActivatedRoute } from '@angular/router';
import { DataReciverService } from '../../services/data-reciver.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postResponse: PostResponse | undefined;
  isLoadingPost = false;
  isLoadingSubComments = false;
 
  postId: string | null = null;
  pathSubscription: Subscription | undefined;
  appUserId: string | undefined;

  constructor(
    private postService: PostService,
    private alertService: CustomAlertService,
    private changesDetectRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private dataReciver: DataReciverService,
  ) {}


  ngOnInit(): void {
    this.appUserId = this.dataReciver.getApplicationUserId();
    this.pathSubscription = this.route.paramMap.subscribe(params => {
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
      this.postResponse = await this.postService.getPostById(this.postId);
    } catch (error) {
      this.postResponse = undefined;
    } finally {
      this.isLoadingPost = false;
      this.changesDetectRef.detectChanges();
    }
  }

 
  ngOnDestroy(): void {
   if(this.pathSubscription)
      this.pathSubscription.unsubscribe();
  }

}
