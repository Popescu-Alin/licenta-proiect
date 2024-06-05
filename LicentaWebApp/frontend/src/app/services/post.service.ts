import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import { AddPostDto, Client, FileParameter, Post, PostResponse, UploadImageResponse } from '../client/client';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getPosts(take: number, skip: number): Promise<PostResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getPosts(take, skip).toPromise();
  }

  getPostsByUserId(
    take: number,
    skip: number,
    userID: string
  ): Promise<PostResponse[] | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getPostsByUsreId(take, skip, userID).toPromise();
  }

  addPost(post: AddPostDto): Promise<PostResponse | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addPost(post).toPromise();
  }

  getPost(postId: string): Promise<PostResponse | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getPostById(postId).toPromise();
  }

  uploadPostImage(image: FileParameter): Promise<UploadImageResponse | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.uploadPostImage(image).toPromise();
  }
}
