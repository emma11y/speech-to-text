import { Component, OnInit, ViewChild } from '@angular/core';
//import { SpeechClient } from '@google-cloud/speech';

// Documentation : https://github.com/googleapis/nodejs-speech/blob/main/samples/infiniteStreaming.js

@Component({
  selector: 'app-tts-google',
  templateUrl: './tts-google.component.html',
  styleUrls: ['./tts-google.component.scss'],
})
export class TtsGoogleComponent implements OnInit {
  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion
  /* private recognition!: SpeechClient;
  private recognizeStream: any;

  @ViewChild('pTranscriptGoogle', { static: true }) pTranscript: HTMLElement | undefined;

  public isRecording: boolean = false;
  public transcript: string = '';

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.recognition = new SpeechClient();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.startRecognition();
  }

  public onStopRecognitionClick(event: any): void {
    this.recognizeStream.end();
    this.recognizeStream.removeListener('data', this.speechCallback);
    this.recognizeStream = null;
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new SpeechClient();
  }

  public startRecognition(): void {
    if (this.recognition === undefined) this.initRecognition();

    const request = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'fr-FR',
      interimResults: true,
    };

    this.recognizeStream = this.recognition
      .streamingRecognize(request)
      .on('error', (err: any) => {
        if (err.code === 11) {
          // restartStream();
        } else {
          console.error('API request error ' + err);
        }
      })
      .on('data', (e) => this.speechCallback(e, this.pTranscript));
  }

  public speechCallback(event: any, transcriptElement: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');

    if (transcriptElement) transcriptElement.nativeElement.innerText = this.transcript;
  }
  //#endregion
  */
}
