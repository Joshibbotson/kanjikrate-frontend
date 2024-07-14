import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBreadCrumbsPart } from './bread-crumbs.types';

@Component({
  selector: 'common-bread-crumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent {
  public readonly urlParts = input.required<IBreadCrumbsPart[]>();
}
