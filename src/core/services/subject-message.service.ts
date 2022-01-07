import { Injectable } from '@angular/core';
import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';
import { SubjectMessage } from '@shared/models/subject-message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectMessageService {
  private _subjectMessageService$ = new Subject<any>();

  get subject(): Subject<any> {
    return this._subjectMessageService$;
  }

  constructor() {}

  public next(subjectType: SubjectMessageTypeEnum, message: any = null): void {
    this._subjectMessageService$.next({ type: subjectType, message: message } as SubjectMessage);
  }
}
