import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from '@core/app-config';
import {
  CancellationDetails,
  CancellationReason,
  Recognizer,
  ResultReason,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

@Component({
  selector: 'app-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.scss'],
})
export class MicrosoftComponent implements OnInit {
  private recognizer: SpeechRecognizer;
  private finalTranscript: string = '';
  private prevOffset = 0;
  private transcript: string = '';

  public isRecording: boolean = false;
  public textTranscripted: string = '';

  constructor(private titleService: Title) {
    titleService.setTitle('Microsoft Speech-To-Text');
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.textTranscripted = '';
    this.transcript = '';
    this.finalTranscript = '';

    this.prevOffset = 0;
    this.isRecording = true;

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
    this.textTranscripted = this.finalTranscript + this.transcript;
  }

  public onStopRecognitionClick(): void {
    this.isRecording = false;
    this.textTranscripted = this.finalTranscript + this.transcript;
    this.recognizer.stopContinuousRecognitionAsync();
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
