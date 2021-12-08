export class NavigationItem {
  public id: number;
  public parentId: number;
  public name: string;
  public title: string;
  public url: string;
  public icon: string;
  public permissionName: string;
  public children: NavigationItem[];
  public isActive?: boolean;
  public isCollapsed?: boolean;
  public isSecondary: boolean;

  constructor(
    name: string,
    title: string,
    url: string,
    icon: string = null,
    permissionName: string = null,
    children: NavigationItem[] = null,
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
