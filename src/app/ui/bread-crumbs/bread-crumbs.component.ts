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
    const { currentTitle, currentPath, parentTitle, parentPath } =
      this.getRouteTitles();
    console.log(currentTitle, currentPath, parentTitle, parentPath);
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
    console.log(this.route.pathFromRoot);
    let currentTitle = null;
    let currentPath = null;

    let parentTitle = null;
    let parentPath = null;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      if (currentRoute.snapshot.title) {
        parentTitle = currentTitle;
        parentPath = currentPath;
        currentTitle = currentRoute.snapshot.title;
        console.log(currentRoute.snapshot);
        if (currentRoute.snapshot.routeConfig?.path?.charAt(0) === ':') {
          currentRoute.params.subscribe((val) => {
            currentPath = Object.entries(val)[1];
          });
        }
        // console.log(currentRoute.snapshot.routeConfig?.path?.charAt(0) === ':');
        // currentPath = currentPath.snapshot.pathFromRoot;
      }
    }

    return { currentTitle, currentPath, parentTitle, parentPath };
  }
}
