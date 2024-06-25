import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { QuoteApiService } from '../../services/quote-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  // public readonly $quote: Observable<string>;
  constructor(
    private readonly _authService: AuthService,
    private readonly _quoteApiService: QuoteApiService,
    private readonly router: Router
  ) {
    this._quoteApiService.fetchRandomQuote().subscribe((quotes) => {
      console.log(quotes);
    });
  }

  public handleLogout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}
