import { Component, OnInit } from '@angular/core';
import { BasicUserInfo, PostResponse } from '../../client/client';
import { CustomAlertService } from '../../services/custom-alert.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { UrlUtil } from '../../utils/url-util';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  users: BasicUserInfo[] | undefined;
  posts: PostResponse[] | undefined;

  urlUtil = UrlUtil;

  isLoadingUsers: boolean = false;
  isLoadingPosts: boolean = false;
  isFirstSearch: boolean = true;
  hasResults: boolean = false;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private alertService: CustomAlertService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Search');
  }

  ngOnInit() {
    this.isFirstSearch = true;
    this.hasResults = true;
  }

  async loadUsers(search: string) {
    this.isLoadingUsers = true;
    try {
      this.users = await this.userService.searchForUser(search);
    } catch (error) {
      this.users = undefined;
      this.alertService.errorSnackBar('Error while searching for users');
    } finally {
      this.isLoadingUsers = false;
    }
  }

  async loadPosts(search: string) {
    this.isLoadingPosts = true;
    try {
      this.posts = await this.postService.searchPost(search);
    } catch (error) {
      this.posts = undefined;
      this.alertService.errorSnackBar('Error while searching for posts');
    } finally {
      this.isLoadingPosts = false;
    }
  }

  async search(event: Event, search: string) {
    event.preventDefault();
    if (search === '') {
      this.alertService.errorSnackBar('Search field is empty');
      return;
    }
    this.isFirstSearch = false;
    this.hasResults =
      (this.users?.length !== 0 || this.posts?.length !== 0) &&
      this.isFirstSearch;
    await this.loadUsers(search);
    await this.loadPosts(search);
  }

  redirectToUserPage(userId: string) {
    this.router.navigate(['/profile', userId]);
  }

  redirectToPostPage(postId: string) {
    this.router.navigate(['/post', postId]);
  }
}
