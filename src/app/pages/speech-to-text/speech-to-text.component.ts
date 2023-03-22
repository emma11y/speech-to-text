import { SpeechToTextMozillaComponent } from '@shared/components/speech-to-text-components/speech-to-text-mozilla/speech-to-text-mozilla.component';
import { SpeechToTextDeepgramComponent } from '@shared/components/speech-to-text-components/speech-to-text-deepgram/speech-to-text-deepgram.component';
import { SpeechToTextGoogleComponent } from '@shared/components/speech-to-text-components/speech-to-text-google/speech-to-text-google.component';
import { PrefilledTextDto } from '@shared/dtos/prefilled-text.dto';
import { PrefilledTextsService } from '@core/services/prefilled-texts.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpeechToTextWhisperComponent } from '@shared/components/speech-to-text-components/speech-to-text-whisper/speech-to-text-whisper.component';
import { Result } from '@core/model/result';
import { Transcription } from '@core/model/transcription';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
})
export class SpeechToTextComponent implements OnInit {
  public textToSpeech: string = '';
  public isRecording: boolean = false;

  public isMozillaEnabled: boolean = false;
  public isMicrosoftEnabled: boolean = false;
  public isGoogleEnabled: boolean = false;
  public isDeepgramEnabled: boolean = false;
  public isWhisperEnabled: boolean = false;

  public prefilledTexts: PrefilledTextDto[] = [];
  public selectedPrefilledText: PrefilledTextDto;

  @ViewChild('Deepgram') public deepgram: SpeechToTextDeepgramComponent;
  @ViewChild('Google') public google: SpeechToTextGoogleComponent;
  @ViewChild('Microsoft') public microsoft: SpeechToTextGoogleComponent;
  @ViewChild('Mozilla') public mozilla: SpeechToTextMozillaComponent;
  @ViewChild('Whisper') public whisper: SpeechToTextWhisperComponent;

  constructor(prefilledTextsService: PrefilledTextsService) {
    this.prefilledTexts = prefilledTextsService.getItems();
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    if (!this.isEnabled) {
      alert('Vous devez sélectionner au moins une API');
      return;
    }

    this.isRecording = true;

    if (this.isMozillaEnabled) this.mozilla.onStartRecognitionClick();
    if (this.isMicrosoftEnabled) this.microsoft.onStartRecognitionClick();
    if (this.isGoogleEnabled) this.google.onStartRecognitionClick();
    if (this.isDeepgramEnabled) this.deepgram.onStartRecognitionClick();
    if (this.isWhisperEnabled) this.whisper.onStartRecognitionClick();
  }

  public onStopRecognitionClick(): void {
    this.isRecording = false;
    if (this.isMozillaEnabled) this.mozilla.onStopRecognitionClick();
    if (this.isMicrosoftEnabled) this.microsoft.onStopRecognitionClick();
    if (this.isGoogleEnabled) this.google.onStopRecognitionClick();
    if (this.isDeepgramEnabled) this.deepgram.onStopRecognitionClick();
    if (this.isWhisperEnabled) this.whisper.onStopRecognitionClick();
  }

  public onPrefilledTextChange(id: string): void {
    this.selectedPrefilledText = this.prefilledTexts.find((x) => x.id === Number.parseInt(id));
    this.textToSpeech = this.selectedPrefilledText.text;
  }

  public onDownloadClick(): void {
    var result: Result[] = [];

    if (this.isDeepgramEnabled) {
      result.push(this.deepgram.result);
    }

    if (this.isGoogleEnabled) {
      result.push(this.google.result);
    }

    if (this.isMicrosoftEnabled) {
      result.push(this.microsoft.result);
    }

    if (this.isMozillaEnabled) {
      result.push(this.mozilla.result);
    }

    if (this.isWhisperEnabled) {
      result.push(this.whisper.result);
    }

    const transcription: Transcription = new Transcription();
    const document = transcription.create(this.textToSpeech, result);
    transcription.download(document);
  }

  //#endregion

  //#region FUNCTION

  get isEnabled(): boolean {
    return this.isDeepgramEnabled || this.isGoogleEnabled || this.isMicrosoftEnabled || this.isMozillaEnabled || this.isWhisperEnabled;
  }

  //#endregion
}
