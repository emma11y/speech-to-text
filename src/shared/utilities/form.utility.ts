import { FormGroup, AbstractControl } from '@angular/forms';
import { isMoment } from 'moment';

export function createFormData(object: any, form?: FormData, namespace?: string): FormData {
  const formData: FormData = form || new FormData();

  for (const property in object) {
    if (!object.hasOwnProperty(property) || !object[property]) {
      continue;
    }

    const formKey: string = namespace ? `${namespace}[${property}]` : property;

    if (object[property] instanceof Date || isMoment(object[property])) {
      formData.append(formKey, object[property].toISOString());
    } else if (object[property] instanceof File) {
      formData.append('files', object[property], object[property].name);
    } else if (typeof object[property] === 'object') {
      createFormData(object[property], formData, formKey);
    } else {
      formData.append(formKey, object[property]);
    }
  }

  return formData;
}

export function markControlAsTouched(control: AbstractControl): void {
  control.markAsTouched();
  control.updateValueAndValidity();
}

export function markControlAsTouchedOnForm(form: FormGroup): void {
  for (const control of Object.values(form.controls)) {
    control.markAsTouched();
    control.updateValueAndValidity();
  }
}

export function formatString(str: string, ...val: string[]): string {
  if (str === undefined) return;
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
}
