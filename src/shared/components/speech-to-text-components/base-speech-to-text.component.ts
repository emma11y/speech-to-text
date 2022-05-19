import { Directive, Input, ViewChild } from '@angular/core';
import { compareText } from '@shared/utilities/string.utility';

@Directive()
export class BaseSpeechToTextComponent {
  @Input() public textToSpeech: string = '';

  public name: string;
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  @ViewChild('pTranscript', { static: true }) pTranscript: HTMLElement | undefined;

  constructor() {}

  protected initRecognition(): void {}
  protected onStartRecognitionClick(): void {
    this.resultSpeechToText = 0;
  }

  protected onRecognitionResult(event: any, transcriptElement: any): void {}
  protected onStopRecognitionClick(): void {}

  protected compareText(): void {
    this.resultSpeechToText = compareText(this.textToSpeech, this.transcript);
    console.log('compareText', this.textToSpeech, this.transcript, this.resultSpeechToText);
  }

  protected setTranscriptText(transcriptElement: any, text: string): void {
    transcriptElement.nativeElement.innerText = text;
  }
}
