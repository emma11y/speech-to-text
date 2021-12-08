import { Component, OnInit, TemplateRef } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[class.ngb-toasts]': 'true' }
})
export class AlertComponent implements OnInit {
  constructor(public alertService: AlertService) {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS

  //#endregion

  //#region FUNCTIONS
  public isTemplate(toast): any {
    return toast.textOrTpl instanceof TemplateRef;
  }
  //#endregion
}
