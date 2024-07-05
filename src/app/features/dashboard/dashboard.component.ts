import { Component } from '@angular/core';
import { DeckCardComponent } from '../../ui/deck-card/deckCard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DeckCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
