import { SubjectMessageService } from '@core/services/subject-message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '@core/app-config';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { filter } from 'rxjs/operators';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

// https://github.com/googleapis/nodejs-speech
// Documentation : https://github.com/googleapis/nodejs-speech/blob/main/samples/infiniteStreaming.js
// https://github.com/googlecreativelab/obvi/blob/master/voice-button.js

@Component({
  selector: 'app-speech-to-text-google',
  templateUrl: '../base-speech-to-text.component.html',
  styleUrls: ['../base-speech-to-text.component.scss'],
})
export class SpeechToTextGoogleComponent extends BaseSpeechToTextComponent implements OnInit {
  private mediaRecorder: MediaRecorder;

  constructor(private _subjectMessageService: SubjectMessageService) {
    super();

    this._subjectMessageService.subject
      .pipe(
        filter(
          (subjectMessage: SubjectMessage) =>
            subjectMessage.type === SubjectMessageTypeEnum.START_GOOGLE || subjectMessage.type === SubjectMessageTypeEnum.STOP_GOOGLE
        )
      )
      .subscribe((subjectMessage: SubjectMessage) => {
        if (subjectMessage.type === SubjectMessageTypeEnum.START_GOOGLE) {
          this.onStartRecognitionClick();
        } else {
          this.onStopRecognitionClick();
        }
      });
  }

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.name = 'Google';
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    super.onStartRecognitionClick();
    this.setTranscriptText(this.pTranscript, '');
    this.initRecognition();
  }

  public onRecognitionResult(blob: any, transcriptElement: any): void {
    this.convertBlobToBase64(blob, (data) => {
      let postBody = {
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: AppConfig.appSettings.language,
          enableWordTimeOffsets: false,
        },
        audio: {
          content: `${data}`,
        },
      };

      let xhr = new XMLHttpRequest();
      xhr.open('POST', `https://speech.googleapis.com/v1/speech:recognize?key=${AppConfig.appSettings.google.apiKey}`, true);
      xhr.onload = () => {
        let response = JSON.parse(xhr.responseText);
        if (
          response &&
          response.results &&
          response.results[0] &&
          response.results[0].alternatives &&
          response.results[0].alternatives[0] &&
          response.results[0].alternatives[0].transcript
        ) {
          this.transcript = response.results[0].alternatives[0].transcript;
          this.setTranscriptText(transcriptElement, this.transcript);
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
    this.mediaRecorder.stop();

    this.mediaRecorder.ondataavailable = async (event: BlobEvent) => {
      if (event.data.size > 0) {
        this.onRecognitionResult(event.data, this.pTranscript);
      }
    };
  }

  //#endregion

  //#region FUNCTIONS

  public initRecognition(): void {
    (this.pTranscript as any).nativeElement.innerText = '';
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
