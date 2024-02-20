import { AppConfig } from '@core/app-config';
import { Component, NgZone } from '@angular/core';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

@Component({
  selector: 'app-speech-to-text-whisper',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextWhisperComponent extends BaseSpeechToTextComponent {
  private mediaRecorder: MediaRecorder;
  private isStarted: boolean = false;

  private chunks = [];

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.name = 'Whisper';
    //this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.chunks = [];
    this.isStarted = true;
    super.onStartRecognitionClick();
    this.setTranscriptText('');
    this.initRecognition();
  }

  public onStopRecognitionClick(): void {
    this.isStarted = false;
    this.mediaRecorder.stop();
  }

  public async onRecognitionResult(blob: Blob): Promise<void> {
    const file = new File([blob], 'video.webm', {
      type: blob.type,
    });

    var data = new FormData();
    data.append('file', file);
    data.append('model', 'whisper-1');
    data.append('response_format', 'text');
    data.append('language', AppConfig.appSettings.whisper.language);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.openai.com/v1/audio/transcriptions`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + AppConfig.appSettings.whisper.apiKey);

    xhr.onload = () => {
      this.transcript = xhr.responseText;
      this.setTranscriptText(this.transcript);
    };

    xhr.onloadend = () => {
      this.compareText();
    };

    xhr.onerror = () => {
      console.error('Error occurred during Whisper request.');
    };

    xhr.send(data);
  }

  //#endregion

  //#region FUNCTIONS

  protected initRecognition(): void {
    if (!this.isStarted) return;

    //this.mediaRecorder = null;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);

          const blob = new Blob(this.chunks, {
            type: 'audio/webm',
          });

          this.onRecognitionResult(blob);
        }
      };

      //this.mediaRecorder.start();
      this.mediaRecorder.start(1000);
    });
  }

  //#endregion
}
