export class AppConfig {
  public static appSettings: AppSettings;
  public static appBaseHref: string;
}

export interface AppSettings {
  appBaseUrl: string;
  language: string;
  interimResults: boolean;
  microsoft: {
    apiKey: string;
    location: string;
  };
  google: {
    projectId: string;
  };
  deepgram: {
    apiKey: string;
  };
}
