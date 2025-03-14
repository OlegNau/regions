import {AbstractControl, ValidatorFn} from "@angular/forms";

export function lengthValidator(min: number, max: number, message: string): ValidatorFn {
    return ({value}: AbstractControl) => {
        return !value || (value.length >= min && value.length <= max)
            ? null
            : {message};
    };
}
