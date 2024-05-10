import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  // setUserData(User: LoginResponse) {
  //   if (typeof sessionStorage !== 'undefined') {
  //     sessionStorage.setItem('user', JSON.stringify(User));
  //   }
  // }

  // getUserData(): LoginResponse | undefined {
  //   if (typeof sessionStorage !== 'undefined') {
  //     return JSON.parse(sessionStorage.getItem('user')!) ?? undefined;
  //   }
  //   return undefined;
  // }

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

  clearServiceData() {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
