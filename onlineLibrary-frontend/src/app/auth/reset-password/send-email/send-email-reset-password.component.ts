import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'library-send-email-reset-password',
  templateUrl: './send-email-reset-password.component.html',
  styleUrls: ['./send-email-reset-password.component.scss']
})
export class SendEmailResetPasswordComponent implements OnInit{

  form: FormGroup;
  isLoading = false;
  error: string;
  isFirstSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authServce: AuthService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  submitForm(): void {
    
    this.isFirstSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    this.authServce.sendResetPassword(this.emailField.value).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/info-page', {msg: 'An email has been sent to you to reset your password.'}])
      },
      err => {
        this.isLoading = false;
        switch (err.error.exception) {
          case 'UsernameNotFoundException': {
            this.error = `User was not foudn.`;
            break;
          }
          default: {
            this.error = `Error: contact the administrator`;
            break;
          }

        }
      }
    )
  }

}
