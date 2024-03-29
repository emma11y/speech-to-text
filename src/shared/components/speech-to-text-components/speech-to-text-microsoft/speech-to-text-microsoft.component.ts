import { AppConfig } from '@core/app-config';
import { Component, NgZone } from '@angular/core';
import {
  CancellationDetails,
  CancellationReason,
  Recognizer,
  ResultReason,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

//https://docs.microsoft.com/fr-fr/azure/cognitive-services/speech-service/get-started-speech-to-text?tabs=windowsinstall&pivots=programming-language-nodejs

@Component({
  selector: 'app-speech-to-text-microsoft',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextMicrosoftComponent extends BaseSpeechToTextComponent {
  private recognizer: SpeechRecognizer;
  private prevOffset: number = 0;
  private finalTranscript: string = '';

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.name = 'Microsoft';
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    super.onStartRecognitionClick();
    this.setTranscriptText('');
    this.prevOffset = 0;
    this.finalTranscript = '';
    this.recognizer.startContinuousRecognitionAsync();
  }

  public onRecognitionResult(event: SpeechRecognitionEventArgs): void {
    switch (event.result.reason) {
      case ResultReason.RecognizedSpeech:
        console.log(`RECOGNIZED: Text=${event.result.text}`);
        break;
      case ResultReason.NoMatch:
        console.log('NOMATCH: Speech could not be recognized.');
        return;
      case ResultReason.Canceled:
        const cancellation = CancellationDetails.fromResult(event.result);
        console.log(`CANCELED: Reason=${cancellation.reason}`);

        if (cancellation.reason == CancellationReason.Error) {
          console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
          console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
          console.log('CANCELED: Did you update the key and location/region info?');
        }
        return;
    }

    if (this.prevOffset === 0) {
      this.prevOffset = event.result.offset;
    }

    if (event.result.offset !== this.prevOffset) {
      this.prevOffset = event.result.offset;
      this.finalTranscript += `${this.transcript} `;
    }

    this.transcript = event.result.text;
    this.setTranscriptText(this.finalTranscript + this.transcript);
  }

  public onStopRecognitionClick(): void {
    this.transcript = this.finalTranscript + this.transcript;
    this.recognizer.stopContinuousRecognitionAsync();
    this.compareText();
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    const speechConfig = SpeechConfig.fromSubscription(AppConfig.appSettings.microsoft.apiKey, AppConfig.appSettings.microsoft.location);
    speechConfig.speechRecognitionLanguage = AppConfig.appSettings.language;
    this.recognizer = new SpeechRecognizer(speechConfig);
    this.recognizer.recognizing = (sender: Recognizer, event: SpeechRecognitionEventArgs) => this.onRecognitionResult(event);
  }

  //#endregion
}
