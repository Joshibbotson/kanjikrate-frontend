import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-end-card',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './end-card.component.html',
  styleUrl: './end-card.component.scss',
})
export class EndCardComponent {}
