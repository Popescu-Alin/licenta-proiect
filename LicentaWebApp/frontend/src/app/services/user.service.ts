import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import { BasicUserInfo, Client, UserProfileDTO } from '../client/client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  getUserProfile(id: string): Promise<UserProfileDTO | undefined >{
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.getProfileById(id).toPromise();
  }

  searchForUser(searchString: string): Promise<BasicUserInfo[] | undefined>{
    this.client.setAuthToken(this.dataReciver.getToken()!);
    return this.client.searchUser(searchString).toPromise();
  }
}
