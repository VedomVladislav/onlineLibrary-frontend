import { FormGroup } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string): (formGroup: FormGroup) => null {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (!control || !matchingControl) {
            return null;
        }

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        if (control.value !== matchingControl.value) {
            console.log("control.value = " + control.value + " matchingControl.valid = " + matchingControl.valid)
            matchingControl.setErrors({ mustMatch: true })
        } else {
            console.log("FALSE")
            matchingControl.setErrors(null)
        }
    }
};