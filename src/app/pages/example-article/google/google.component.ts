import { Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from '@core/app-config';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
})
export class GoogleComponent implements OnInit {
  public isRecording: boolean = false;
  public transcript: string = '';

  private mediaRecorder: MediaRecorder;

  constructor(private titleService: Title, private _ngZone: NgZone) {
    titleService.setTitle('Google Speech-To-Text');
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.isRecording = true;
    this.mediaRecorder = null;
    this.transcript = '';

    this.initRecognition();
  }

  public onRecognitionResult(blob: any): void {
    this.convertBlobToBase64(blob, (data: any) => {
      const googleConfig = {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: AppConfig.appSettings.language,
        enableWordTimeOffsets: false,
      };

      let postBody = {
        config: googleConfig,
        audio: {
          content: `${data}`,
        },
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', `https://speech.googleapis.com/v1/speech:recognize?key=${AppConfig.appSettings.google.apiKey}`, true);
      xhr.onload = () => {
        this._ngZone.run(() => {
          let response = JSON.parse(xhr.responseText);
          if (response && response.results[0].alternatives[0].transcript) {
            this.transcript = response.results[0].alternatives[0].transcript;
          }
        });
      };

      xhr.onerror = () => {
        console.error('Error occurred during Cloud Speech AJAX request.');
      };

      xhr.send(JSON.stringify(postBody));
    });
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

  //#endregion

  //#region FUNCTIONS

  public initRecognition(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      this.mediaRecorder.start(1000);
    });
  }

  private convertBlobToBase64(blob: Blob, callBack: any): void {
    let reader = new FileReader();

    reader.onloadend = () => {
      let dataUrl = reader.result;
      let base64 = dataUrl.toString().split(',')[1];
      callBack(base64);
    };

    reader.onerror = (err) => {
      console.error('Error in reading blob', err);
    };

    reader.readAsDataURL(blob);
  }
}
