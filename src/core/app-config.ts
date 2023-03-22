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
    apiKey: string;
  };
  deepgram: {
    apiKey: string;
  };
  whisper: {
    apiKey: string;
  };
}
