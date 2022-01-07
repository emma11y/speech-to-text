import { Component, OnInit } from '@angular/core';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss'],
})
export class TtsComponent implements OnInit {
  public textToSpeech: string = '';
  public isRecording: boolean = false;

  public isMozillaEnabled: boolean = true;
  public isMicrosoftEnabled: boolean = true;
  public isGoogleEnabled: boolean = true;
  public isDeepgramEnabled: boolean = true;

  constructor(private readonly _subjectMessageService: SubjectMessageService) {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.isRecording = true;
    if (this.isMozillaEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_MOZILLA, event);
    if (this.isMicrosoftEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_MICROSOFT, event);
    if (this.isGoogleEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_GOOGLE, event);
    if (this.isDeepgramEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_DEEPGRAM, event);
  }

  public onStopRecognitionClick(event: any): void {
    this.isRecording = false;
    if (this.isMozillaEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_MOZILLA, event);
    if (this.isMicrosoftEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_MICROSOFT, event);
    if (this.isGoogleEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_GOOGLE, event);
    if (this.isDeepgramEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_DEEPGRAM, event);
  }
  //#endregion

  //#region FUNCTION

  //#endregion
}
