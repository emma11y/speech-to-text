import { AppConfig } from '@core/app-config';
import { Component, NgZone } from '@angular/core';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-speech-to-text-mozilla',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextMozillaComponent extends BaseSpeechToTextComponent {
  private recognition: any;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.name = 'Mozilla';
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    super.onStartRecognitionClick();
    this.setTranscriptText('');
    this.recognition.start();
  }

  public onRecognitionResult(event: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');

    this.setTranscriptText(this.transcript);
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
    this.recognition.addEventListener('result', (e: any) => this.onRecognitionResult(e));
  }
  //#endregion
}
