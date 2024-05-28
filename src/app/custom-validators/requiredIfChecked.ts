import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// export function requiredIfChecked(independent_field_name: string): (control: AbstractControl) => ValidationErrors | null {
//     return (control: AbstractControl) : ValidationErrors | null => {
//         // setTimeout(() => {
            
//         // }, timeout);
//         let formGroup = control.parent;
//         let dependent_field = control;
//         let independent_field = formGroup?.get(independent_field_name);

//         // 

//         if (independent_field?.value == true && !dependent_field?.value) return {requiredIfChecked: true};

//         return null;
//     }
// }

export function requiredIfChecked(controlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const otherControl = control.parent?.get(controlName);
      // 
      if (otherControl && otherControl.value == true) {
        if (!control.value) {
          return { required: true };
        }
      }
      return null;
    };
  }