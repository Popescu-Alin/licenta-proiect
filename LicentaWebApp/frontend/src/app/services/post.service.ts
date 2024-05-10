import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import { Client, Post, PostResponse } from '../client/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getPosts(take: number, skip: number): Observable<PostResponse[]> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getPosts(take,skip);
  }

  addPost(post: Post): Observable<PostResponse> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addPost(post);
  }

}
