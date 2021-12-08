import { Component, Input, OnInit } from '@angular/core';
import { Navigation } from 'src/shared/models/navigation/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() public navigation!: Navigation;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  //#endregion

  //#region FUNCTIONS
  //#endregion
}
