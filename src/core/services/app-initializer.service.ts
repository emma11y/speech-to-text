import { PlatformLocation } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@core/app-config';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(private _platformLocation: PlatformLocation, private _httpClient: HttpClient, handler: HttpBackend) {
    // Using HttpBackend by this way avoid httpRequest to be intercepted by an interceptor
    // tslint:disable-next-line:max-line-length
    // https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
    this._httpClient = new HttpClient(handler);
  }

  private getBaseHref(): string {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }

    return '/';
  }

  private getDocumentOrigin(): string {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return document.location.protocol + '//' + document.location.hostname + port;
    }

    return document.location.origin;
  }

  private getApplicationConfig(appRootUrl: string, callback: () => void): void {
    this._httpClient.get<any>(`${appRootUrl}settings/${environment.appConfig}`).subscribe((response) => {
      AppConfig.appSettings = response;
      callback();
    });
  }

  public init(): () => Promise<boolean> {
    return () => {
      return new Promise<boolean>((resolve, reject) => {
        AppConfig.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + AppConfig.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          resolve(true);
        });
      });
    };
  }
}
