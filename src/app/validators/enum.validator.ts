import { AbstractControl, ValidatorFn } from '@angular/forms';

export class EnumValidator {
    static isElementOf(enumeration): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const elementIsValid = enumeration[control.value];
            return typeof elementIsValid !== 'undefined' ? null : { 'NOT_IN_ENUM': { value: control.value } };
        };
    }
}
