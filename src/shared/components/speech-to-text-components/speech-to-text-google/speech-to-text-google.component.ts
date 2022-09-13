import { Component, NgZone } from '@angular/core';
import { AppConfig } from '@core/app-config';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

// https://github.com/googleapis/nodejs-speech
// Documentation : https://github.com/googleapis/nodejs-speech/blob/main/samples/infiniteStreaming.js
// https://github.com/googlecreativelab/obvi/blob/master/voice-button.js

@Component({
  selector: 'app-speech-to-text-google',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextGoogleComponent extends BaseSpeechToTextComponent {
  private mediaRecorder: MediaRecorder;
  private isStarted: boolean = false;

  constructor(ngZone: NgZone) {
    super(ngZone);
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.name = 'Google';
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    this.isStarted = true;
    super.onStartRecognitionClick();
    this.setTranscriptText('');
    this.initRecognition();
  }

  public onRecognitionResult(blob: any): void {
    this.convertBlobToBase64(blob, (data) => {
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
        let response = JSON.parse(xhr.responseText);
        if (response && response.results[0].alternatives[0].transcript) {
          this.transcript = response.results[0].alternatives[0].transcript;
          this.setTranscriptText(this.transcript);
        }
      };

      xhr.onloadend = () => {
        this.compareText();
      };

      xhr.onerror = () => {
        console.error('Error occurred during Cloud Speech AJAX request.');
      };
      xhr.send(JSON.stringify(postBody));
    });
  }

  public onStopRecognitionClick(): void {
    this.isStarted = false;
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
    if (!this.isStarted) return;

    this.mediaRecorder = null;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      this.mediaRecorder.start();
    });
  }

  private convertBlobToBase64(blob: Blob, cb: any): void {
    let reader = new FileReader();
    reader.onloadend = () => {
      let dataUrl = reader.result;
      let base64 = dataUrl.toString().split(',')[1];
      cb(base64);
    };
    reader.onerror = (err) => {
      console.error('Error in reading blob', err);
    };
    reader.readAsDataURL(blob);
  }
}
