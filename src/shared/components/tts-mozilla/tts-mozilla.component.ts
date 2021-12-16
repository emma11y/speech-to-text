import { AppConfig } from '@core/app-config';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { compareText } from '@shared/utilities/string.utility';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-tts-mozilla',
  templateUrl: './tts-mozilla.component.html',
  styleUrls: ['./tts-mozilla.component.scss'],
})
export class TtsMozillaComponent implements OnInit {
  @Input() public textToSpeech: string = '';

  private recognition: any;

  @ViewChild('pTranscriptMozilla', { static: true }) pTranscript: HTMLElement | undefined;

  public transcript: string = '';
  public resultSpeechToText: number = 0;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.resultSpeechToText = 0;
    this.recognition.start();
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');

    if (transcriptElement) transcriptElement.nativeElement.innerText = this.transcript;
  }

  public onStopRecognitionClick(event: any): void {
    this.recognition.stop();
    this.resultSpeechToText = compareText(this.textToSpeech, this.transcript);
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = AppConfig.appSettings.language;
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.addEventListener('result', (e: any) => this.onRecognitionResult(e, this.pTranscript));
  }
  //#endregion
}
