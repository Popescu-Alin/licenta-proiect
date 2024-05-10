import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostResponse } from '../../client/client';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  postSubscription!: Subscription;
  userSubscription!: Subscription
  postResponses: PostResponse[] | undefined;
  
  userData:  undefined;
  isLoadingPosts = false;
  isLoadingUser = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private changesDetectRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    // this.isLoadingUser = true;
    // this.userSubscription = this.userService.getUserProfile().subscribe({
    //   next: (user: UserDTO | undefined) => {
    //     if(user !== undefined) {
    //       this.userData = user;
    //     }
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    //   complete: () => {
        
    //     this.changesDetectRef.detectChanges();
    //     this.loadPosts();
    //     this.isLoadingUser = false;
    //   },
    // });
  }

  loadPosts() {
    // this.isLoadingPosts = true;
    // this.postSubscription = this.postService.getPosts(0,1).subscribe({
    //   next: (posts: PostResponse[] | undefined) => {
    //     if(posts !== undefined) {
    //       this.postResponses = posts.filter(post => post.post?.userId === this.userData?.id);
    //     }
    //   },
    //   error: (error) => {
    //     this.postResponses = undefined;
    //   },
    //   complete: () => {
    //     this.isLoadingPosts = false;
    //     this.changesDetectRef.detectChanges();
    //   },
    // });
  }

}
