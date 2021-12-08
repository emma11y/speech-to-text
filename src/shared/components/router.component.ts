import { Title } from '@angular/platform-browser';
import { Directive } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationItem } from '@models/navigation/navigation-item';
import { Navigation } from '@shared/models/navigation/navigation';
import { setFocusToTitleForAccessibility } from '@shared/utilities/accessibility.utility';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class RouterComponent {
  public navigation: Navigation;
  public currentNavigationItem: NavigationItem;

  constructor(
    router: Router,
    route: ActivatedRoute,
    //private readonly _permissionCheckerService: PermissionCheckerService,
    private readonly _titleService: Title
  ) {
    route.data.subscribe((data) => {
      this.navigation = data.navigation;

      // Filter alowed routes
      this.filterNavigationItemsWithPermissions(
        this.navigation.navigationItems
      );

      router.events.subscribe((event) => {
        this.setNavigationItemIsActive(
          router.url,
          null,
          this.navigation.navigationItems
        );
        setFocusToTitleForAccessibility();

        this.currentNavigationItem = this.navigation.navigationItems.find(
          (navigationItem: NavigationItem) => navigationItem.isActive
        );
      });
    });
  }

  //#region FUNCTIONS
  private setNavigationItemIsActive(
    url: string,
    parentNavigationItem: NavigationItem,
    navigationItems: NavigationItem[]
  ): void {
    navigationItems.forEach((navigationItem: NavigationItem) => {
      if (
        parentNavigationItem &&
        navigationItem.url.indexOf(parentNavigationItem.url) === -1
      ) {
        navigationItem.url = parentNavigationItem.url + navigationItem.url;
      }

      // Case Home = '/' else
      navigationItem.isActive =
        (navigationItem.url.length === 1 && url.length === 1) ||
        (navigationItem.url.length > 1 &&
          url.indexOf(navigationItem.url) === 0);

      if (navigationItem.isActive) {
        this._titleService.setTitle(navigationItem.title + ' - CinéST');
      }
    });
  }

  private filterNavigationItemsWithPermissions(
    navigationItems: NavigationItem[]
  ): void {
    const allowedNavigationItems: NavigationItem[] = [];

    /* navigationItems.forEach((navigationItem: NavigationItem) => {
      if (!navigationItem.permissionName || this._permissionCheckerService.isGranted(navigationItem.permissionName))
        allowedNavigationItems.push(navigationItem);
    });*/

    this.navigation.navigationItems = allowedNavigationItems;
  }

  //#endregion
}
