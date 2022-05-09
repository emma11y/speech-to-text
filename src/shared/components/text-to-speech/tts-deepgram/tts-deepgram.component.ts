import { AppConfig } from '@core/app-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveTranscriptionOptions } from '@deepgram/sdk/dist/types';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { filter } from 'rxjs/operators';
import { TextToSpeechComponent } from '@shared/components/text-to-speech/text-to-speech.component';
import * as queryString from 'query-string';

@Component({
  selector: 'app-tts-deepgram',
  templateUrl: './tts-deepgram.component.html',
  styleUrls: ['./tts-deepgram.component.scss'],
})
export class TtsDeepgramComponent extends TextToSpeechComponent implements OnInit {
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
        const event = subjectMessage.message;
        if (subjectMessage.type === SubjectMessageTypeEnum.START_DEEPGRAM) {
          this.onStartRecognitionClick(event);
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
  public onStartRecognitionClick(event: any): void {
    super.onStartRecognitionClick(event);
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

        this.mediaRecorder.start(1);
      };

      this.socket.onmessage = (message) => {
        this.onRecognitionResult(message, this.pTranscript);
      };
    });
  }
  //#endregion
}
