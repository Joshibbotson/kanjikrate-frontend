import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LocalAuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private authService: LocalAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
        return resolve(false);
      }
      this.authService.validateToken(token).subscribe((tkn) => {
        if (tkn.success) {
          resolve(true);
        } else {
          this.authService.logout();
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
