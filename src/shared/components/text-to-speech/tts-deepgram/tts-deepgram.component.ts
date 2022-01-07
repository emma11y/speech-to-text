import { AppConfig } from '@core/app-config';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Deepgram } from '@deepgram/sdk';
import { LiveTranscriptionOptions } from '@deepgram/sdk/dist/types';
import { LiveTranscription } from '@deepgram/sdk/dist/transcription/liveTranscription';
import { SubjectMessageService } from '@core/services/subject-message.service';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { filter } from 'rxjs/operators';
import { TextToSpeechComponent } from '@shared/components/text-to-speech/text-to-speech.component';

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
          this.onStopRecognitionClick(event);
        }
      });
  }

  private recognition!: Deepgram;
  private mediaRecorder!: MediaRecorder;

  @ViewChild('pTranscriptDeepgram', { static: true }) pTranscript: HTMLElement | undefined;

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.initRecognition();
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      const options: LiveTranscriptionOptions = {
        language: AppConfig.appSettings.language,
        version: 'latest',
        interim_results: AppConfig.appSettings.interimResults,
      };

      const deepgramSocket: LiveTranscription = this.recognition.transcription.live(options);

      deepgramSocket.addListener('open', () => {
        this.mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && deepgramSocket.getReadyState() == 1) {
            deepgramSocket.send(event.data);
          }
        });
        this.mediaRecorder.start();
      });

      deepgramSocket.addListener('transcriptReceived', (e: any) => this.onRecognitionResult(e, this.pTranscript));
    });
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    console.log(event);

    /*   const transcript = received.channel.alternatives[0].transcript;
    if (transcript && received.is_final) {
      console.log(transcript);
    }*/
  }

  public onStopRecognitionClick(event: any): void {
    this.mediaRecorder.stop();
    super.onStopRecognitionClick(event);
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new Deepgram(AppConfig.appSettings.deepgram.apiKey, 'localhost:4201');
  }
  //#endregion
}
