import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogInTokenRepsone } from '../client/client';

@Injectable({
  providedIn: 'root',
})
export class DataReciverService {
  constructor() {
    this.setIsLogedIn(this.getToken() !== undefined);
  }

  private isLogedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogedIn$: Observable<boolean> = this.isLogedInSubject.asObservable();

  setIsLogedIn(value: boolean): void {
    this.isLogedInSubject.next(value);
  }

  getIsLogedIn(): Observable<boolean> {
    return this.isLogedIn$;
  }
  setUserData(User: LogInTokenRepsone) {
    this.setApplicationUserId(User.userId!);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('user', JSON.stringify(User));
    }
  }

  getUserData(): LogInTokenRepsone | undefined {
    if (typeof sessionStorage !== 'undefined') {
      return JSON.parse(sessionStorage.getItem('user')!) ?? undefined;
    }
    return undefined;
  }

  setToken(token: string) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('token', token);
    }
  }

  getToken(): string | undefined {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('token') ?? undefined;
    }
    return undefined;
  }

  setApplicationUserId(userId: string) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('applicationUserId', userId);
    }
  }

  getApplicationUserId(): string | undefined {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('applicationUserId') ?? undefined;
    }
    return undefined;
  }

  clearServiceData() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
