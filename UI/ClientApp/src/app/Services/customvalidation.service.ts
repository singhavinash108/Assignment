import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {



  MatchEmail(email: string, confirmEmail: string) {
    return (formGroup: FormGroup) => {
      const emailControl = formGroup.controls[email];
      const confirmEmailControl = formGroup.controls[confirmEmail];

      if (!emailControl || !confirmEmailControl) {
        return null;
      }

      if (confirmEmailControl.errors && !confirmEmailControl.errors.emailMismatch) {
        return null;
      }

      if (emailControl.value.toLowerCase().trim() !== confirmEmailControl.value.toLowerCase().trim()) {
        confirmEmailControl.setErrors({ emailMismatch: true });
      } else {
        confirmEmailControl.setErrors(null);
      }
    }
  }



}
