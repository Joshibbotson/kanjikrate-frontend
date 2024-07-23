import { Component } from '@angular/core';
import { DeckCardComponent } from '../../ui/deck-card/deckCard.component';
import { ReviewFrequencyBarchartComponent } from './components/review-frequency-barchart/review-frequency-barchart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [DeckCardComponent, ReviewFrequencyBarchartComponent],
})
export class DashboardComponent {}
