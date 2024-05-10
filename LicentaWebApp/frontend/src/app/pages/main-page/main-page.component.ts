import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostResponse } from '../../client/client';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  postSubscription!: Subscription;
  postResponses: PostResponse[] | undefined;
  
  isModalOpen = false;
  isLoading = false;

  constructor(
    private postService: PostService,
    private changesDetectRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading = true;
    this.postSubscription = this.postService.getPosts(1,1).subscribe({
      next: (posts: PostResponse[] | undefined) => {
        if(posts !== undefined) {
          this.postResponses = posts;
        }
        
      },
      error: (error) => {
        this.postResponses = undefined;
      },
      complete: () => {
        this.isLoading = false;
        this.changesDetectRef.detectChanges();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToTheList(post: PostResponse) {
    console.log('post', post);
    this.postResponses?.push(post);
    this.isModalOpen = false;
    this.changesDetectRef.detectChanges();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
