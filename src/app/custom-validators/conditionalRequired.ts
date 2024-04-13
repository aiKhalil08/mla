import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function conditionalRequired(controlName: string, value: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControl = control.parent?.get(controlName);
    // console.log(otherControl, control)
    if (otherControl && otherControl.value === value) {
      if (!control.value) {
        return { required: true };
      }
    }
    return null;
  };
}
