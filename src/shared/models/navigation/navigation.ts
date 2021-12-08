import { NavigationItem } from './navigation-item';

export class Navigation {
  public rootUrl: string;
  public title: string | null; // Can be null if we consider this navigation is on top level / not sub level
  public navigationItems: NavigationItem[] = [];

  constructor(rootUrl: string, title: string | null, navigationItems: NavigationItem[] = []) {
    this.title = title;
    this.rootUrl = rootUrl;
    this.navigationItems = navigationItems;
  }
}
