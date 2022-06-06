import { SpeechToTextOptions } from '@models/speech-to-text-options';
import { Directive, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { compareText as getResultAfterCompareText } from '@shared/utilities/string.utility';
import { clone, isEqual } from 'lodash';

@Directive()
export class BaseSpeechToTextComponent implements OnInit {
  @Input() public textToSpeech: string = '';
  //@Input() public options: SpeechToTextOptions = new SpeechToTextOptions();

  public name: string;
  public transcript: string = '';
  public resultSpeechToText: number = 0;

  //  public oldOptions: SpeechToTextOptions = new SpeechToTextOptions();

  @ViewChild('pTranscript', { static: true }) pTranscript: HTMLElement | undefined;

  constructor(private _ngZone: NgZone) {}

  public ngOnInit(): void {}

  public ngDoCheck(): void {
    /* if (!isEqual(this.oldOptions, this.options)) {
      this.initRecognition();
      this.oldOptions = clone(this.options);
    }*/
  }

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
