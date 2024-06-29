import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-decks-list',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './decks-list.component.html',
  styleUrl: './decks-list.component.scss',
})
export class DecksListComponent {}
