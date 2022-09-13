import { SpeechToTextMozillaComponent } from '@shared/components/speech-to-text-components/speech-to-text-mozilla/speech-to-text-mozilla.component';
import { SpeechToTextDeepgramComponent } from '@shared/components/speech-to-text-components/speech-to-text-deepgram/speech-to-text-deepgram.component';
import { SpeechToTextGoogleComponent } from '@shared/components/speech-to-text-components/speech-to-text-google/speech-to-text-google.component';
import { PrefilledTextDto } from '@shared/dtos/prefilled-text.dto';
import { PrefilledTextsService } from '@core/services/prefilled-texts.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('Deepgram') public deepgram: SpeechToTextDeepgramComponent;
  @ViewChild('Google') public google: SpeechToTextGoogleComponent;
  @ViewChild('Microsoft') public microsoft: SpeechToTextGoogleComponent;
  @ViewChild('Mozilla') public mozilla: SpeechToTextMozillaComponent;

  constructor(prefilledTextsService: PrefilledTextsService) {
    this.prefilledTexts = prefilledTextsService.getItems();
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.isRecording = true;

    if (this.isMozillaEnabled) this.mozilla.onStartRecognitionClick();
    if (this.isMicrosoftEnabled) this.microsoft.onStartRecognitionClick();
    if (this.isGoogleEnabled) this.google.onStartRecognitionClick();
    if (this.isDeepgramEnabled) this.deepgram.onStartRecognitionClick();
  }

  public onStopRecognitionClick(event: any): void {
    this.isRecording = false;
    if (this.isMozillaEnabled) this.mozilla.onStopRecognitionClick();
    if (this.isMicrosoftEnabled) this.microsoft.onStopRecognitionClick();
    if (this.isGoogleEnabled) this.google.onStopRecognitionClick();
    if (this.isDeepgramEnabled) this.deepgram.onStopRecognitionClick();
  }

  public onPrefilledTextChange(id: string): void {
    this.selectedPrefilledText = this.prefilledTexts.find((x) => x.id === Number.parseInt(id));
    this.textToSpeech = this.selectedPrefilledText.text;
  }
  //#endregion

  //#region FUNCTION

  //#endregion
}
