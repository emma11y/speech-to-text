import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppConfig } from '@core/app-config';
import { SpeechClient } from '@google-cloud/speech';
import { compareText } from '@shared/utilities/string.utility';

// https://github.com/googleapis/nodejs-speech
// Documentation : https://github.com/googleapis/nodejs-speech/blob/main/samples/infiniteStreaming.js
// A essayer ? https://github.com/googlecreativelab/obvi
// https://github.com/gridcellcoder/cloud-speech-and-vision-demos/blob/master/speech-server/src/server.ts
// https://blog.softwaremill.com/how-to-use-googles-speech-to-text-in-a-web-application-working-example-a4b64c61f133
// https://www.google.com/intl/fr/chrome/demos/speech.html

//https://www.npmjs.com/package/@angular-devkit/build-webpack

@Component({
  selector: 'app-tts-google',
  templateUrl: './tts-google.component.html',
  styleUrls: ['./tts-google.component.scss'],
})
export class TtsGoogleComponent implements OnInit {
  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {}
  //#endregion
}

/*
  @Input() public textToSpeech: string = '';
  @ViewChild('pTranscriptGoogle', { static: true }) pTranscript: HTMLElement | undefined;

  private recognition!: SpeechClient;
  private recognizeStream: any;

  public transcript: string = '';
  public resultSpeechToText: number = 0;

  constructor() {}

  //#region LIFE CYCLES
  public ngOnInit(): void {
    this.recognition = new SpeechClient({
      projectId: AppConfig.appSettings.google.projectId,
    });
  }
  //#endregion

  //#region EVENTS
  public onStartRecognitionClick(event: any): void {
    this.startRecognition();
  }

  public onStopRecognitionClick(event: any): void {
    this.recognizeStream.end();
    this.recognizeStream.removeListener('data', this.speechCallback);
    this.recognizeStream = null;

    this.resultSpeechToText = compareText(this.textToSpeech, this.transcript);
  }
  //#endregion

  //#region FUNCTIONS
  public initRecognition(): void {
    this.recognition = new SpeechClient();
  }

  public startRecognition(): void {
    if (this.recognition === undefined) this.initRecognition();

    const request = {
      encoding: 'LINEAR16',
      enableWordTimeOffsets: true,
      languageCode: AppConfig.appSettings.language,
      interimResults: AppConfig.appSettings.interimResults,
    };

    this.recognizeStream = this.recognition
      .streamingRecognize(request)
      .on('error', (err: any) => {
        if (err.code === 11) {
          // restartStream();
        } else {
          console.error('API request error ' + err);
        }
      })
      .on('data', (e: any) => this.speechCallback(e, this.pTranscript));
  }

  public speechCallback(event: any, transcriptElement: any): void {
    this.transcript = Array.from(event.results)
      .map((result: any) => result.alternatives[0].transcript)
      .join('\n');

    if (transcriptElement) transcriptElement.nativeElement.innerText = this.transcript;
  }
  //#endregion
}

/*postTranscription(blob) {
    this.showLoader();
    this.blobToBase64(blob, (data) => {
      let xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://speech.googleapis.com/v1/speech:recognize?key=" +
          this.cloudSpeechApiKey,
        !0
      );
      xhr.onload = () => {
        this.hideLoader();
        let response = JSON.parse(xhr.responseText);
        if (
          response &&
          response.results &&
          response.results[0] &&
          response.results[0].alternatives &&
          response.results[0].alternatives[0] &&
          response.results[0].alternatives[0].transcript
        ) {
          let text = response.results[0].alternatives[0].transcript || "",
            event = {
              speechResult: text,
              confidence: response.results[0].alternatives[0].confidence,
              isFinal: !0
            };
          this.dispatchEvent(new CustomEvent("onSpeech", { detail: event }));
        }
      };
      xhr.onerror = () => {
        console.error("Error occurred during Cloud Speech AJAX request.");
      };
      xhr.send(`{
          "config": {
            "encoding": "LINEAR16",
            "languageCode": "fr-FR",
            "enableWordTimeOffsets": true
            "interimResults":true
          },
          "audio": {
            "content": "${data}"
          }
        }`);
    });
  }*/
