import { Component, computed, input } from '@angular/core';

export enum EBtnSize {
  FULLWIDTH = 'fullWidth',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum EBtnColourScheme {
  SUCCESS = 'sucess',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
}

@Component({
  selector: 'common-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public title = input.required<string>();
  public size = input<EBtnSize>(EBtnSize.FULLWIDTH);
  public colour = input<EBtnColourScheme>(EBtnColourScheme.SUCCESS);
  public disabled = input<boolean>(false);
  public classSize = computed(() => {
    switch (this.size()) {
      case EBtnSize.FULLWIDTH:
        return 'full-width-btn';
      case EBtnSize.LARGE:
        return 'large-btn';
      case EBtnSize.MEDIUM:
        return 'med-btn';
      case EBtnSize.SMALL:
        return 'small-btn';
      default:
        return '';
    }
  });
  public classColour = computed(() => {
    switch (this.colour()) {
      case EBtnColourScheme.SUCCESS:
        return 'success-btn';
      case EBtnColourScheme.DANGER:
        return 'danger-btn';
      case EBtnColourScheme.WARNING:
        return 'warning-btn';
      case EBtnColourScheme.INFO:
        return 'info-btn';
      default:
        return '';
    }
  });
}
