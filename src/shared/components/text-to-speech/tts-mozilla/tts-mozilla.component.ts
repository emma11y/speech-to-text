import { TextToSpeechComponent } from './../text-to-speech.component';
import { AppConfig } from '@core/app-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectMessage } from '@shared/models/subject-message';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { filter } from 'rxjs/operators';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-tts-mozilla',
  templateUrl: './tts-mozilla.component.html',
  styleUrls: ['./tts-mozilla.component.scss'],
})
export class TtsMozillaComponent extends TextToSpeechComponent implements OnInit {
  private recognition: any;

  @ViewChild('pTranscriptMozilla', { static: true }) pTranscript: HTMLElement | undefined;
  constructor(private readonly _subjectMessageService: SubjectMessageService) {
    super();
    this._subjectMessageService.subject
      .pipe(
        filter(
          (subjectMessage: SubjectMessage) =>
            subjectMessage.type === SubjectMessageTypeEnum.START_MOZILLA || subjectMessage.type === SubjectMessageTypeEnum.STOP_MOZILLA
        )
      )
      .subscribe((subjectMessage: SubjectMessage) => {
        const event = subjectMessage.message;
        if (subjectMessage.type === SubjectMessageTypeEnum.START_MOZILLA) {
          this.onStartRecognitionClick(event);
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
  public onStartRecognitionClick(event: any): void {
    super.onStartRecognitionClick(event);
    this.setTranscriptText(this.pTranscript, '');
    this.recognition.start();
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');

    this.setTranscriptText(transcriptElement, this.transcript);
  }

  public onStopRecognitionClick(): void {
    this.recognition.stop();
    this.compareText();
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = AppConfig.appSettings.language;
    this.recognition.continuous = true;
    this.recognition.interimResults = AppConfig.appSettings.interimResults;
    this.recognition.addEventListener('result', (e: any) => this.onRecognitionResult(e, this.pTranscript));
  }
  //#endregion
}
