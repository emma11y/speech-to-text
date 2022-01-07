import { TtsDeepgramComponent } from '@shared/components/text-to-speech/tts-deepgram/tts-deepgram.component';
import { TtsMicrosoftComponent } from '@shared/components/text-to-speech/tts-microsoft/tts-microsoft.component';
import { TtsMozillaComponent } from '@shared/components/text-to-speech/tts-mozilla/tts-mozilla.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss'],
})
export class TtsComponent implements OnInit {
  @ViewChild('TtsMozilla', { static: true }) public ttsMozilla!: TtsMozillaComponent;
  @ViewChild('TtsMicrosoft', { static: true }) public ttsMicrosoft!: TtsMicrosoftComponent;
  @ViewChild('TtsDeepgram', { static: true }) public ttsDeepgram!: TtsDeepgramComponent;

  public textToSpeech: string = '';
  public isRecording: boolean = false;

  public isMozillaEnabled: boolean = true;
  public isMicrosoftEnabled: boolean = true;
  public isGoogleEnabled: boolean = true;
  public isDeepgramEnabled: boolean = true;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.isRecording = true;
    if (this.isMozillaEnabled) this.ttsMozilla.onStartRecognitionClick(event);
    if (this.isMicrosoftEnabled) this.ttsMicrosoft.onStartRecognitionClick(event);
    if (this.isDeepgramEnabled) this.ttsDeepgram.onStartRecognitionClick(event);
  }

  public onStopRecognitionClick(event: any): void {
    this.isRecording = false;
    if (this.isMozillaEnabled) this.ttsMozilla.onStopRecognitionClick(event);
    if (this.isMicrosoftEnabled) this.ttsMicrosoft.onStopRecognitionClick(event);
    if (this.isDeepgramEnabled) this.ttsDeepgram.onStopRecognitionClick(event);
  }
  //#endregion

  //#region FUNCTION

  //#endregion
}
