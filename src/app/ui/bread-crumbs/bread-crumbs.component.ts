import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    console.log(this.route.snapshot.routeConfig);
    const { currentTitle, parentTitle } = this.getRouteTitles();
    console.log(currentTitle, parentTitle);
  }

  // initialiseBreadCrumbs() {
  //   [
  //     {
  //       display: 'Decks',
  //       link: '/decks',
  //     },
  //     {
  //       display: this.deckData?.name || 'id',
  //       link: `/decks/${id}`,
  //     },
  //   ];
  // }

  getRouteTitles(): {
    currentTitle: string | null;
    currentPath: string | null;
    parentTitle: string | null;
    parentPath: string | null;
  } {
    let currentRoute = this.route.root;

    let currentTitle = null;
    let currentPath = null;
    let parentTitle = null;
    let parentPath = null;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      currentPath = currentRoute.pathFromRoot;
      if (currentRoute.snapshot.title) {
        parentTitle = currentTitle;
        parentPath = currentPath;
        currentTitle = currentRoute.snapshot.title;
        currentPath = currentPath.snapshot.pathFromRoot;
      }
    }

    return { currentTitle, parentTitle, currentPath, parentPath };
  }
}
