import { Component, OnInit, ViewChild } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-tts-mozilla',
  templateUrl: './tts-mozilla.component.html',
  styleUrls: ['./tts-mozilla.component.scss'],
})
export class TtsMozillaComponent implements OnInit {
  private recognition: any;
  // private pTranscript: HTMLElement | null = null;

  @ViewChild('pTranscript', { static: true }) pTranscript: HTMLElement | undefined;

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
    this.recognition.start();
    this.isRecording = true;
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    const transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');

    if (transcriptElement) transcriptElement.nativeElement.innerText = transcript;
  }

  public onStopRecognitionClick(event: any): void {
    this.recognition.stop();
    this.isRecording = false;
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.addEventListener('result', (e: any) => this.onRecognitionResult(e, this.pTranscript));
  }
  //#endregion
}
