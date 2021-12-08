import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlertService {
  public toasts: any[] = [];

  public show(textOrTpl: string | TemplateRef<any>, options: any = {}): void {
    this.toasts.push({ textOrTpl, ...options });
  }

  public showSuccess(textOrTpl: string | TemplateRef<any>): void {
    this.show(textOrTpl, { classname: 'bg-success' });
  }

  public showError(textOrTpl: string | TemplateRef<any>): void {
    this.show(textOrTpl, { classname: 'bg-danger' });
  }

  public remove(toast: any): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
