import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from '@core/app-config';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-mozilla',
  templateUrl: './mozilla.component.html',
  styleUrls: ['./mozilla.component.scss'],
})
export class MozillaComponent implements OnInit {
  private recognition: any;

  public transcript: string = '';
  public isRecording = false;

  constructor(titleService: Title) {
    titleService.setTitle('Mozilla Speech-To-Text');
  }
  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }

  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.transcript = '';
    this.isRecording = true;
    this.recognition.start();
  }

  public onRecognitionResult(event: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');
  }

  public onStopRecognitionClick(): void {
    this.isRecording = false;
    this.recognition.stop();
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
