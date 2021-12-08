export class NavigationItem {
  public name: string;
  public title: string;
  public url: string;
  public icon: string | null;
  public permissionName: string | null;
  public children: NavigationItem[] | null;
  public isActive?: boolean;
  public isCollapsed?: boolean;
  public isSecondary: boolean;

  constructor(
    name: string,
    title: string,
    url: string,
    icon: string | null = null,
    permissionName: string | null = null,
    children: NavigationItem[] | null = null,
    isSecondary = false
  ) {
    this.name = name;
    this.title = title;
    this.url = url;
    this.icon = icon;
    this.permissionName = permissionName;
    this.children = children;
    this.isSecondary = isSecondary;
  }
}
