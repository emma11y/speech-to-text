import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from '@core/app-config';
import { LiveTranscriptionOptions } from '@deepgram/sdk/dist/types';
import * as queryString from 'query-string';

@Component({
  selector: 'app-deepgram',
  templateUrl: './deepgram.component.html',
  styleUrls: ['./deepgram.component.scss'],
})
export class DeepgramComponent implements OnInit {
  public isRecording: boolean = false;
  public textTranscripted: string;
  public transcript: string;
  public transcriptFinal: string;

  private mediaRecorder: MediaRecorder;
  private socket: WebSocket;
  private start: number;

  constructor(private titleService: Title) {
    titleService.setTitle('Deepgram Speech-To-Text');
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.textTranscripted = '';
    this.transcript = '';
    this.transcriptFinal = '';

    this.start = 0;
    this.isRecording = true;

    this.initRecognition();
  }

  public onRecognitionResult(event: any): void {
    const data = JSON.parse(event.data);
    console.log(data);

    if (data.start !== this.start) {
      this.start = data.start;
      this.transcriptFinal += `${this.transcript} `;
    }

    this.transcript = data.channel.alternatives[0].transcript;
    this.textTranscripted = this.transcriptFinal + this.transcript;
  }

  public onStopRecognitionClick(): void {
    this.textTranscripted = this.transcriptFinal;
    this.isRecording = false;

    this.mediaRecorder.stop();
    this.socket.close();
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    if (!this.isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      const liveTranscriptionOptions: LiveTranscriptionOptions = {
        language: 'fr',
        version: 'latest',
        interim_results: true,
      };

      this.socket = new WebSocket('wss://api.deepgram.com/v1/listen?' + queryString.stringify(liveTranscriptionOptions), [
        'token',
        AppConfig.appSettings.deepgram.apiKey,
      ]);

      this.socket.onopen = () => {
        this.mediaRecorder.ondataavailable = async (event: BlobEvent) => {
          if (event.data.size > 0 && this.socket.readyState === 1) {
            this.socket.send(event.data);
          }
        };

        this.mediaRecorder.start(0.25);
      };

      this.socket.onmessage = (message) => {
        this.onRecognitionResult(message);
      };
    });
  }
  //#endregion
}
