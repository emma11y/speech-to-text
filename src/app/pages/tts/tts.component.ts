import { TtsMicrosoftComponent } from '@shared/components/tts-microsoft/tts-microsoft.component';
import { TtsMozillaComponent } from '@shared/components/tts-mozilla/tts-mozilla.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss'],
})
export class TtsComponent implements OnInit {
  @ViewChild('TtsMozilla', { static: true }) public ttsMozilla!: TtsMozillaComponent;
  @ViewChild('TtsMicrosoft', { static: true }) public ttsMicrosoft!: TtsMicrosoftComponent;

  public textToSpeech: string = '';
  public isRecording: boolean = false;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.isRecording = true;
    this.ttsMozilla.onStartRecognitionClick(event);
    this.ttsMicrosoft.onStartRecognitionClick(event);
  }

  public onStopRecognitionClick(event: any): void {
    this.isRecording = false;
    this.ttsMozilla.onStopRecognitionClick(event);
    this.ttsMicrosoft.onStopRecognitionClick(event);
  }
  //#endregion

  //#region FUNCTION

  //#endregion
}
