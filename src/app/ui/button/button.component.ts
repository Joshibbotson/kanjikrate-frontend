import { Component, input } from '@angular/core';

@Component({
  selector: 'CommonButton',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public title = input.required<string>();
  public disabled = input<boolean>(false);
}
