import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { LocalAuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
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
