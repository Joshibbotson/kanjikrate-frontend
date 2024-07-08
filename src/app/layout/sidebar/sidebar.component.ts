import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalAuthService } from '../../features/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private usernameSignal = signal<string | undefined>(
    this.localAuthService.User?.name
  );
  public readonly username = computed(() => this.usernameSignal());

  constructor(
    private readonly localAuthService: LocalAuthService,
    private readonly router: Router
  ) {}

  public handleLogout() {
    this.localAuthService.logout();
    this.router.navigate(['/login']);
  }
}
