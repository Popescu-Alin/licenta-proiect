import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function matchValues(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['matchValues']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchValues: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}