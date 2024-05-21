import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import { Client, UserProfileDTO } from '../client/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getUserProfile(): Promise<UserProfileDTO | undefined >{
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getProfile().toPromise();
  }
}
