import { Directive, Input, NgZone, OnInit } from '@angular/core';
import { Result } from '@core/model/result';
import { getResultAfterCompareText } from '@shared/utilities/string.utility';

@Directive()
export class BaseSpeechToTextComponent implements OnInit {
  @Input() public textToSpeech: string = '';

  public name: string;
  public transcript: string = '';
  public resultSpeechToText: number = 0;
  public finalText: string = '';

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {}

  protected initRecognition(): void {
    throw new Error('Method not implemented.');
  }
  protected onStartRecognitionClick(): void {
    this.finalText = '';
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
    this.finalText = text;
  }

  get result(): Result {
    return new Result(this.name, this.finalText, this.resultSpeechToText);
  }
}
