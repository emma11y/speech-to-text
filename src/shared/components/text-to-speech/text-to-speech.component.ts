import { Directive, Input } from '@angular/core';
import { compareText } from '@shared/utilities/string.utility';

@Directive()
export class TextToSpeechComponent {
  @Input() public textToSpeech: string = '';
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  constructor() {}

  protected initRecognition(): void {}
  protected onStartRecognitionClick(event: any): void {}
  protected onRecognitionResult(event: any, transcriptElement: any): void {}
  protected onStopRecognitionClick(event: any): void {
    this.resultSpeechToText = compareText(this.textToSpeech, this.transcript);
  }
}
