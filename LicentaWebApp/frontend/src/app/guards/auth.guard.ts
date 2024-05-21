// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataReciverService } from '../services/data-reciver.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private dataReciver: DataReciverService) {}

  canActivate(): boolean {
    const token: string | undefined = this.dataReciver.getToken();
    if (token != undefined && token != null) {
      return true; 
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
