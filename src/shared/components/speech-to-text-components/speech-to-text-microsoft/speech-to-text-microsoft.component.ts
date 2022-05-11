import { AppConfig } from '@core/app-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CancellationDetails,
  CancellationReason,
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

//https://docs.microsoft.com/fr-fr/azure/cognitive-services/speech-service/get-started-speech-to-text?tabs=windowsinstall&pivots=programming-language-nodejs

@Component({
  selector: 'app-speech-to-text-microsoft',
  templateUrl: './speech-to-text-microsoft.component.html',
  styleUrls: ['./speech-to-text-microsoft.component.scss'],
})
export class SpeechToTextMicrosoftComponent extends BaseSpeechToTextComponent implements OnInit {
  private recognizer!: SpeechRecognizer;
  private privOffset: number = 0;
  private transcriptFinal: string = '';

  @ViewChild('pTranscriptMicrosoft', { static: true }) pTranscript: HTMLElement | undefined;

  constructor(private readonly _subjectMessageService: SubjectMessageService) {
    super();
    this._subjectMessageService.subject
      .pipe(
        filter(
          (subjectMessage: SubjectMessage) =>
            subjectMessage.type === SubjectMessageTypeEnum.START_MICROSOFT || subjectMessage.type === SubjectMessageTypeEnum.STOP_MICROSOFT
        )
      )
      .subscribe((subjectMessage: SubjectMessage) => {
        if (subjectMessage.type === SubjectMessageTypeEnum.START_MICROSOFT) {
          this.onStartRecognitionClick();
        } else {
          this.onStopRecognitionClick();
        }
      });
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    super.onStartRecognitionClick();
    this.setTranscriptText(this.pTranscript, '');
    this.privOffset = 0;
    this.recognizer.startContinuousRecognitionAsync();
  }

  public onRecognitionResult(event: SpeechRecognitionEventArgs, transcriptElement: any): void {
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
    this.setTranscriptText(transcriptElement, this.transcriptFinal + this.transcript);
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

    this.recognizer = new SpeechRecognizer(speechConfig);
    this.recognizer.recognizing = (sender: Recognizer, event: SpeechRecognitionEventArgs) =>
      this.onRecognitionResult(event, this.pTranscript);
  }
}
