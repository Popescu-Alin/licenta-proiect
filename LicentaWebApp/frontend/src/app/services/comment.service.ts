import { Injectable } from '@angular/core';
import { Client, Comment, CommentResponseSlicedCollection, MainCommmentResposeCollection } from '../client/client';
import { DataReciverService } from './data-reciver.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getMainCommnets(postId: string, take: number, skip:number): Promise< MainCommmentResposeCollection | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getMainComments(postId,take,skip).toPromise();
  }

  getSubComments(postId: string,commentId: string, take: number, skip: number): Promise<CommentResponseSlicedCollection | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getSubComments(postId,commentId,take,skip).toPromise();
  }

  addComment(postId: string, comment: Comment): Promise<Comment | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.addComment(postId,comment).toPromise();
  }

  editComment(commentId: string, comment: Comment): Promise<Comment | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.updateComment(commentId,comment).toPromise();
  }

  deleteComment( commentId: string): Promise<boolean | undefined> {
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.deleteComment(commentId).toPromise();
  }
}
