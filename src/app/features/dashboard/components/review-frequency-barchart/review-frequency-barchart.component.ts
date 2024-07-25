import { Component } from '@angular/core';
import { LocalAuthService } from '../../../auth/auth.service';
import { DeckService, User } from '../../../../api';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';

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
@Component({
  selector: 'app-review-frequency-barchart',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './review-frequency-barchart.component.html',
  styleUrl: './review-frequency-barchart.component.scss',
})
export class ReviewFrequencyBarchartComponent {
  public readonly user: Partial<User> | null;
  public chartOptions: AgChartOptions;

  public readonly weeklyStats = {
    mon: 5,
    tue: 3,
    wed: 5,
    thur: 2,
    fri: 1,
    sat: 10,
    sun: 1,
  };
  public readonly totalReviewedDecks = 27;
  constructor(authService: LocalAuthService, deckService: DeckService) {
    this.user = authService.User;
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'line', xKey: 'month', yKey: 'iceCreamSales' }],
    };
  }

  private fetchWeeklyStats() {
    throw new Error('not implemented yet');
  }
}
