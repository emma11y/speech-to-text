import { Directive, Input, NgZone, ViewChild } from '@angular/core';
import { compareText as getResultAfterCompareText } from '@shared/utilities/string.utility';

@Directive()
export class BaseSpeechToTextComponent {
  @Input() public textToSpeech: string = '';

  public name: string;
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  @ViewChild('pTranscript', { static: true }) pTranscript: HTMLElement | undefined;

  constructor(private _ngZone: NgZone) {}

  protected initRecognition(): void {}
  protected onStartRecognitionClick(): void {
    this.resultSpeechToText = 0;
  }

  protected onRecognitionResult(event: any, transcriptElement: any): void {}
  protected onStopRecognitionClick(): void {}

  protected compareText(): void {
    this._ngZone.run(() => {
      this.resultSpeechToText = getResultAfterCompareText(this.textToSpeech, this.transcript);
    });
  }

  protected setTranscriptText(transcriptElement: any, text: string): void {
    transcriptElement.nativeElement.innerText = text;
  }
}
