import { Directive, Input } from '@angular/core';
import { compareText } from '@shared/utilities/string.utility';

@Directive()
export class TextToSpeechComponent {
  @Input() public textToSpeech: string = '';
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  constructor() {}

  protected initRecognition(): void {}
  protected onStartRecognitionClick(): void {
    this.resultSpeechToText = 0;
  }

  protected onRecognitionResult(event: any, transcriptElement: any): void {}
  protected onStopRecognitionClick(): void {}

  protected compareText(): void {
    this.resultSpeechToText = compareText(this.textToSpeech, this.transcript);
  }

  protected setTranscriptText(transcriptElement: any, text: string): void {
    transcriptElement.nativeElement.innerText = text;
  }
}
