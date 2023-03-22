import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from '@core/app-config';

@Component({
  selector: 'app-whisper',
  templateUrl: './whisper.component.html',
  styleUrls: ['./whisper.component.scss'],
})
export class WhisperComponent implements OnInit {
  public isRecording: boolean = false;
  public transcript: string = '';

  private mediaRecorder: MediaRecorder;

  constructor(private titleService: Title, private _ngZone: NgZone) {
    titleService.setTitle('Whisper Speech-To-Text');
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  public onStartRecognitionClick(): void {
    this.isRecording = true;
    this.mediaRecorder = null;
    this.transcript = '';

    this.initRecognition();
  }

  public onStopRecognitionClick(): void {
    this.isRecording = false;
    this.mediaRecorder.stop();

    this.mediaRecorder.ondataavailable = async (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.onRecognitionResult(event.data);
      }
    };
  }

  public async onRecognitionResult(blob: Blob): Promise<void> {
    const file = new File([blob], 'video.webm', {
      type: blob.type,
    });

    var data = new FormData();
    data.append('file', file);
    data.append('model', 'whisper-1');
    data.append('response_format', 'text');
    data.append('language', AppConfig.appSettings.language);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.openai.com/v1/audio/transcriptions`, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + AppConfig.appSettings.whisper.apiKey);

    xhr.onload = () => {
      this._ngZone.run(() => {
        let response = JSON.parse(xhr.responseText);

        console.log(response);
      });
    };

    xhr.onerror = () => {
      console.error('Error occurred during Whisper request.');
    };

    xhr.send(data);
  }

  //#endregion

  //#region FUNCTIONS

  protected initRecognition(): void {
    if (!this.isRecording) return;

    this.mediaRecorder = null;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      this.mediaRecorder.start();
    });
  }

  //#endregion
}
