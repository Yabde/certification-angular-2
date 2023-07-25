import {AbstractControl, ValidatorFn} from "@angular/forms";

export function hasOneChoiceSelectedValidator<T>(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const choice = control.get(controlName)?.value as T;
    let hasSelectedChoice;

    if (typeof choice === 'string') {
      hasSelectedChoice = !!choice && choice.length > 0
    }

    return hasSelectedChoice ? null : { atLeastOneChoiceRequired: 'Need at least one choice selected' };
  }
}
