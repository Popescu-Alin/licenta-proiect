// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(): Promise<boolean> {
    return this.authService
      .isAuth()
      .then((isAuthenticated) => {
        return true;
      })
      .catch((error) => {
        console.error('Authentication check failed', error);
        this.router.navigate(['/auth/login']);
        return false;
      });
  }
}
