import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tts-google',
  templateUrl: './tts-google.component.html',
  styleUrls: ['./tts-google.component.scss'],
})
export class TtsGoogleComponent implements OnInit {
  private recognition: any;

  @ViewChild('pTranscriptGoogle', { static: true }) pTranscript: HTMLElement | undefined;

  public isRecording: boolean = false;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    event.preventDefault();
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {}

  public onStopRecognitionClick(event: any): void {}
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {}
  //#endregion
}
