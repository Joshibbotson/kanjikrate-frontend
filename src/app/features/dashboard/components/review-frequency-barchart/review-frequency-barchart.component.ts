import { Component } from '@angular/core';

@Component({
  selector: 'app-review-frequency-barchart',
  standalone: true,
  imports: [],
  templateUrl: './review-frequency-barchart.component.html',
  styleUrl: './review-frequency-barchart.component.scss',
})
/** should get the current user, then search for decks reviewed this week
 * Will need to add 'lastReviewed' to decks schema and create some sort of trigger
 * that updates this on final card review
 *
 * We will actually most likely need a new table to record weekly stats for each user,
 * we can keep this up to date using a pre hook or post hook middleware from mongoose
 *
 * Probably best off using a custom backend route to get these statistics:
 * /decks/reviewedDecksThisWeek
 */
export class ReviewFrequencyBarchartComponent {}
