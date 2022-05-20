import { SpeechToTextOptions } from '@shared/models/speech-to-text-options';
import { PrefilledTextDto } from '@shared/dtos/prefilled-text.dto';
import { PrefilledTextsService } from '@core/services/prefilled-texts.service';
import { Component, OnInit } from '@angular/core';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
})
export class SpeechToTextComponent implements OnInit {
  public textToSpeech: string = '';
  public isRecording: boolean = false;

  public isMozillaEnabled: boolean = true;
  public isMicrosoftEnabled: boolean = true;
  public isGoogleEnabled: boolean = true;
  public isDeepgramEnabled: boolean = true;

  public prefilledTexts: PrefilledTextDto[] = [];
  public selectedPrefilledText: PrefilledTextDto;

  public options: SpeechToTextOptions;

  constructor(private readonly _subjectMessageService: SubjectMessageService, prefilledTextsService: PrefilledTextsService) {
    this.prefilledTexts = prefilledTextsService.getItems();
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.options = new SpeechToTextOptions();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.isRecording = true;

    if (this.isMozillaEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_MOZILLA, this.options);
    if (this.isMicrosoftEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_MICROSOFT, this.options);
    if (this.isGoogleEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_GOOGLE, this.options);
    if (this.isDeepgramEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.START_DEEPGRAM, this.options);
  }

  public onStopRecognitionClick(event: any): void {
    this.isRecording = false;
    if (this.isMozillaEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_MOZILLA);
    if (this.isMicrosoftEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_MICROSOFT);
    if (this.isGoogleEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_GOOGLE);
    if (this.isDeepgramEnabled) this._subjectMessageService.next(SubjectMessageTypeEnum.STOP_DEEPGRAM);
  }

  public onPrefilledTextChange(id: string): void {
    this.selectedPrefilledText = this.prefilledTexts.find((x) => x.id === Number.parseInt(id));
    this.textToSpeech = this.selectedPrefilledText.text;
  }
  //#endregion

  //#region FUNCTION

  //#endregion
}
