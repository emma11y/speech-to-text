export class AppConfig {
  public static appSettings: AppSettings;
  public static appBaseHref: string;
}

export interface AppSettings {
  appBaseUrl: string;
  language: string;
  microsoft: {
    apiKey: string;
    location: string;
  };
}
