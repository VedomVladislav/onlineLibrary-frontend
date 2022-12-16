import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from './../service/auth.service';

@Component({
  selector: 'library-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User;
  error: string;
  isFirstSubmitted = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authServce: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group( {
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get userNameField(): AbstractControl {
    return this.form.get('username');
  }  

  get passwordField(): AbstractControl {
    return this.form.get('password');
  }

  submitForm(): void {
    console.log(this.form);
    console.log(this.userNameField.value);
    console.log(this.passwordField.value);

    this.isFirstSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const tempUser = new User()
    tempUser.username = this.userNameField.value;
    tempUser.password = this.passwordField.value;
    this.authServce.login(tempUser).subscribe(
      result => {
        this.isLoading = false;
        this.user = result;
        console.log('user = ' + JSON.stringify(this.user))
      },
      err => {
        this.isLoading = false;
        console.log(err.error.exception);
        switch (err.error.exception) {
          case 'BadCredentialsException': {
            this.error = `Error: check login or password.`;
            break;
          }
          case 'DisabledException': {
            this.error = `User is not activated.`;
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
