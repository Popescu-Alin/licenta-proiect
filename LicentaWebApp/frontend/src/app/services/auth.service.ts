import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, RegistrationDTO, AuthDTO, LogInTokenRepsone } from '../client/client';
import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client:Client) {}

  login(loginData: AuthDTO): Promise<LogInTokenRepsone | undefined> {
    return this.client.login(loginData).toPromise();
  }

  register(user: RegistrationDTO): Observable<void> {
    return this.client.register(user);
  }

  sendConfirmationEmail(email: string): Promise<void> {
    return this.client.resendConfirmationEmail(email).toPromise();
  }
  
  confirmEmail(email: string, token: string): Promise<void> {
    return this.client.confirmEmail(email, token).toPromise();
  }
}
