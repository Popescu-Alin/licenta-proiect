import { Injectable } from '@angular/core';
import { Client } from '../client/client';
import { DataReciverService } from './data-reciver.service';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeService {

  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  likePost(postId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.likePost(postId).toPromise();
  }

  dislikePost(postId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.dislikePost(postId).toPromise();
  }

}

