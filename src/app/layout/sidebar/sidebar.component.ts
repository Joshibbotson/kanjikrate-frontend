import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    private readonly _authService: AuthService,
    private readonly router: Router
  ) {}

  public handleLogout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
