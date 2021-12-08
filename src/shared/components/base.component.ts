import { Injector, ElementRef } from '@angular/core';
import { AppConfig } from '@core/app.config';
import {
  LocalizationService,
  PermissionCheckerService,
  FeatureCheckerService,
  NotifyService,
  SettingService,
  MessageService,
  AbpMultiTenancyService
} from 'abp-ng2-module';

import { SessionService } from '@services/session.service';

export abstract class BaseComponent {
  protected readonly _localizationSourceName = AppConfig.localization.defaultLocalizationSourceName;
  protected readonly _localizationService: LocalizationService;
  protected readonly _permissionCheckerService: PermissionCheckerService;
  protected readonly _featureCheckerService: FeatureCheckerService;
  protected readonly _notifyService: NotifyService;
  protected readonly _settingService: SettingService;
  protected readonly _messageService: MessageService;
  protected readonly _multiTenancyService: AbpMultiTenancyService;
  protected readonly _sessionService: SessionService;
  protected readonly _elementRef: ElementRef;

  constructor(injector: Injector) {
    this._localizationService = injector.get(LocalizationService);
    this._permissionCheckerService = injector.get(PermissionCheckerService);
    this._featureCheckerService = injector.get(FeatureCheckerService);
    this._notifyService = injector.get(NotifyService);
    this._settingService = injector.get(SettingService);
    this._messageService = injector.get(MessageService);
    this._multiTenancyService = injector.get(AbpMultiTenancyService);
    this._sessionService = injector.get(SessionService);
    this._elementRef = injector.get(ElementRef);
  }

  protected l(key: string, ...args: any[]): string {
    let localizedText = this._localizationService.localize(key, this._localizationSourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }

  protected isGranted(permissionName: string): boolean {
    return this._permissionCheckerService.isGranted(permissionName);
  }
}
