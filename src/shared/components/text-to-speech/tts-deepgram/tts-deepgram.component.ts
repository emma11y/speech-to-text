import { AppConfig } from '@core/app-config';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Deepgram } from '@deepgram/sdk';
import { LiveTranscriptionOptions } from '@deepgram/sdk/dist/types';
import { LiveTranscription } from '@deepgram/sdk/dist/transcription/liveTranscription';
import { compareText } from '@shared/utilities/string.utility';
import { TextToSpeechComponent } from '@shared/components/text-to-speech/text-to-speech.component';

@Component({
  selector: 'app-tts-deepgram',
  templateUrl: './tts-deepgram.component.html',
  styleUrls: ['./tts-deepgram.component.scss'],
})
export class TtsDeepgramComponent extends TextToSpeechComponent implements OnInit {
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
      };

      const deepgramSocket: any = this.recognition.transcription.live(options);

      deepgramSocket.addListener('open', () => {
        this.mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && deepgramSocket.readyState == 1) {
            deepgramSocket.send(event.data);
          }
        });
        this.mediaRecorder.start();
      });

      deepgramSocket.addListener('transcriptReceived', (e: any) => this.onRecognitionResult(e, this.pTranscript));
    });
  }

  public onRecognitionResult(event: any, transcriptElement: any): void {
    /*
    const transcript = received.channel.alternatives[0].transcript;
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
    this.recognition = new Deepgram(AppConfig.appSettings.deepgram.apiKey);
  }
  //#endregion
}
