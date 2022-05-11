import { AppConfig } from '@core/app-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveTranscriptionOptions } from '@deepgram/sdk/dist/types';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { filter } from 'rxjs/operators';
import * as queryString from 'query-string';
import { BaseSpeechToTextComponent } from '../base-speech-to-text.component';

@Component({
  selector: 'app-speech-to-text-deepgram',
  templateUrl: './speech-to-text-deepgram.component.html',
  styleUrls: ['./speech-to-text-deepgram.component.scss'],
})
export class SpeechToTextDeepgramComponent extends BaseSpeechToTextComponent implements OnInit {
  constructor(private readonly _subjectMessageService: SubjectMessageService) {
    super();
    this._subjectMessageService.subject
      .pipe(
        filter(
          (subjectMessage: SubjectMessage) =>
            subjectMessage.type === SubjectMessageTypeEnum.START_DEEPGRAM || subjectMessage.type === SubjectMessageTypeEnum.STOP_DEEPGRAM
        )
      )
      .subscribe((subjectMessage: SubjectMessage) => {
        if (subjectMessage.type === SubjectMessageTypeEnum.START_DEEPGRAM) {
          this.onStartRecognitionClick();
        } else {
          this.onStopRecognitionClick();
        }
      });
  }

  private mediaRecorder: MediaRecorder;
  private socket: WebSocket;
  private start: number;
  private transcriptFinal: string = '';

  @ViewChild('pTranscriptDeepgram', { static: true }) pTranscript: HTMLElement | undefined;

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(): void {
    super.onStartRecognitionClick();
    this.setTranscriptText(this.pTranscript, '');
    this.start = 0;
    this.transcriptFinal = '';
    this.initRecognition();
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    const data = JSON.parse(event.data);

    if (data.start !== this.start) {
      this.start = data.start;
      this.transcriptFinal += `${this.transcript} `;
    }

    this.transcript = data.channel.alternatives[0].transcript;
    this.setTranscriptText(transcriptElement, this.transcriptFinal + this.transcript);
  }

  public onStopRecognitionClick(): void {
    this.mediaRecorder.stop();
    this.socket.close();
    this.compareText();
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      // https://www.twitch.tv/videos/1260139238
      const options: LiveTranscriptionOptions = {
        language: 'fr',
        version: 'latest',
        interim_results: AppConfig.appSettings.interimResults,
      };

      this.socket = new WebSocket('wss://api.deepgram.com/v1/listen?' + queryString.stringify(options), [
        'token',
        AppConfig.appSettings.deepgram.apiKey,
      ]);

      this.socket.onopen = () => {
        this.mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && this.socket.readyState === 1) {
            this.socket.send(event.data);
          }
        });

        this.mediaRecorder.start(0.25);
      };

      this.socket.onmessage = (message) => {
        this.onRecognitionResult(message, this.pTranscript);
      };
    });
  }
  //#endregion
}