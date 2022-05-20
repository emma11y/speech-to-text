import { AppConfig } from '@core/app-config';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  CancellationDetails,
  CancellationReason,
  ProfanityOption,
  Recognizer,
  ResultReason,
  SpeechConfig,
  SpeechRecognitionEventArgs,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { filter } from 'rxjs/operators';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';
import { SpeechToTextOptions } from '@shared/models/speech-to-text-options';

//https://docs.microsoft.com/fr-fr/azure/cognitive-services/speech-service/get-started-speech-to-text?tabs=windowsinstall&pivots=programming-language-nodejs

@Component({
  selector: 'app-speech-to-text-microsoft',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextMicrosoftComponent extends BaseSpeechToTextComponent implements OnInit {
  private recognizer!: SpeechRecognizer;
  private privOffset: number = 0;
  private transcriptFinal: string = '';

  private options: SpeechToTextOptions;

  constructor(ngZone: NgZone, private readonly _subjectMessageService: SubjectMessageService) {
    super(ngZone);
    this._subjectMessageService.subject
      .pipe(
        filter(
          (subjectMessage: SubjectMessage) =>
            subjectMessage.type === SubjectMessageTypeEnum.START_MICROSOFT || subjectMessage.type === SubjectMessageTypeEnum.STOP_MICROSOFT
        )
      )
      .subscribe((subjectMessage: SubjectMessage) => {
        if (subjectMessage.type === SubjectMessageTypeEnum.START_MICROSOFT) {
          this.options = subjectMessage.message as SpeechToTextOptions;
          this.onStartRecognitionClick();
        } else {
          this.onStopRecognitionClick();
        }
      });
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
    this.privOffset = 0;
    this.transcriptFinal = '';
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

    if (this.privOffset === 0) {
      this.privOffset = event.result.offset;
    }

    if (event.result.offset !== this.privOffset) {
      this.privOffset = event.result.offset;
      this.transcriptFinal += `${this.transcript} `;
    }

    this.transcript = event.result.text;
    this.setTranscriptText(this.transcriptFinal + this.transcript);
  }

  public onStopRecognitionClick(): void {
    this.recognizer.stopContinuousRecognitionAsync();
    this.compareText();
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    const speechConfig = SpeechConfig.fromSubscription(AppConfig.appSettings.microsoft.apiKey, AppConfig.appSettings.microsoft.location);
    speechConfig.speechRecognitionLanguage = AppConfig.appSettings.language;

    if (this.options) {
      speechConfig.setProfanity(this.options.isAllowProfanity ? ProfanityOption.Raw : ProfanityOption.Masked);
    }

    this.recognizer = new SpeechRecognizer(speechConfig);
    this.recognizer.recognizing = (sender: Recognizer, event: SpeechRecognitionEventArgs) => this.onRecognitionResult(event);
  }
}
