import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterComponent } from 'src/shared/components/router.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent extends RouterComponent implements OnInit {
  constructor(router: Router, route: ActivatedRoute, title: Title) {
    super(router, route, title);
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  //#endregion

  //#region FUNCTIONS
  //#endregion
}
