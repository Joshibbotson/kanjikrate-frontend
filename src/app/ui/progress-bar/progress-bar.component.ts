import { Component, computed, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  public title = input<string>();
  public totalSize = input.required<number>();
  public totalProgress = input.required<number>();
  public totalProgressPercentage = computed(() => {
    return Math.round((this.totalProgress() / this.totalSize()) * 100);
  });
}
