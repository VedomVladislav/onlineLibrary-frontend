import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from './../../../service/auth.service';

@Component({
  selector: 'library-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  form: FormGroup;
  isLoading = true;
  error: string;
  showPasswordForm = false;
  token: string; 
  isFirstSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.currentRoute.params.subscribe(params => {
      this.token = params.token;
      this.showPasswordForm = true;
    })
  }


  get passwordField(): AbstractControl {
    return this.form.get('password');
  }

  get confirmPasswordField(): AbstractControl {
    return this.form.get('confirmPassword');
  }

  submitForm(): void {
    this.isFirstSubmitted = true;
     if (this.form.invalid) {
      return;
     }

     this.isLoading = true;

     this.authService.updatePassword(this.passwordField.value, this.token).subscribe(
       result => {
        this.isLoading = false;

        if (result) {
          this.router.navigate(['/info-page', {msg: 'Password successfully updated.'}])
        }
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['/info-page', {msg: 'Error updating password. The page may have expired. Request password again.'}])
      }
     );
  }
}
