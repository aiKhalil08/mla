import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredIfPresent(controlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(controlName);
    if (otherControl && otherControl.value) {
      if (!control.value) {
        return { required: true };
      }
    }
    return null;
  };
}
