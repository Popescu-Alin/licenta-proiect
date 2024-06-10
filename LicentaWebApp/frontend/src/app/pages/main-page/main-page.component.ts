import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostResponse } from '../../client/client';
import { PostService } from '../../services/post.service';
import { CustomAlertService } from '../../services/custom-alert.service';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  postSubscription!: Subscription;
  postResponses: PostResponse[] | undefined;
  
  isLoading = false;

  constructor(
    private postService: PostService,
    private changesDetectRef: ChangeDetectorRef,
    private customAlertService: CustomAlertService,
    private titleService: TitleService) {
      this.titleService.setTitle("Home");
     }

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    this.isLoading = true;
    try{
      this.postResponses = await this.postService.getPosts(10,0);
    }catch(error) {
      this.postResponses = undefined;
      this.customAlertService.genericErrorMessage();
    }finally {
      this.isLoading = false;
      this.changesDetectRef.detectChanges();
    }
  }
}
