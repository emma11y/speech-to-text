import { SubjectMessageTypeEnum } from '@shared/enums/subject-message-type.enum';

export interface SubjectMessage {
  type: SubjectMessageTypeEnum;
  message: any;
}
