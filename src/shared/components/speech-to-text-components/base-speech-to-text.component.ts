import { Directive, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { getResultAfterCompareText } from '@shared/utilities/string.utility';

@Directive()
export class BaseSpeechToTextComponent implements OnInit {
  @Input() public textToSpeech: string = '';

  public name: string;
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  @ViewChild('pTranscript', { static: true }) pTranscript: HTMLElement | undefined;

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {}

  protected initRecognition(): void {
    throw new Error('Method not implemented.');
  }
  protected onStartRecognitionClick(): void {
    this.resultSpeechToText = 0;
  }

  protected onRecognitionResult(event: any): void {
    throw new Error('Method not implemented.');
  }
  protected onStopRecognitionClick(): void {
    throw new Error('Method not implemented.');
  }

  protected compareText(): void {
    this._ngZone.run(() => {
      this.resultSpeechToText = getResultAfterCompareText(this.textToSpeech, this.transcript);
    });
  }

  protected setTranscriptText(text: string): void {
    (this.pTranscript as any).nativeElement.innerText = text;
  }
}
