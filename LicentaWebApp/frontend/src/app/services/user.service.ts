import { Injectable } from '@angular/core';
import { DataReciverService } from './data-reciver.service';
import { Client } from '../client/client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private dataReciver: DataReciverService,
    private client: Client
  ) {}

  // getUserProfile(): Observable<UserDTO>{
  //   this.client.setAuthToken(this.dataReciver.getToken()!);
  //   return of(new UserDTO());
  // }
}
