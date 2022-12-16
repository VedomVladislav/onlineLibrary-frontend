import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService, User } from '../service/auth.service';

@Component({
  selector: 'library-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  error: string;
  isFirstSubmitted = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    // private router: Route,
    private authServce: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]]
    });

  }

  get userNameField(): AbstractControl {
    return this.form.get('username');
  }  

  get passwordField(): AbstractControl {
    return this.form.get('password');
  }

  get emailField(): AbstractControl {
    return this.form.get('email');
  }

  get confirmPasswordField(): AbstractControl {
    return this.form.get('confirmPassword');
  }

  public submitForm(): void {

    this.isFirstSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const user = new User();
    user.username = this.userNameField.value;
    user.email = this.emailField.value;
    user.password = this.passwordField.value;

    this.authServce.register(user).subscribe(
      () => {
        this.isLoading = false;
        this.error = null;

        // // показываем пользователю информацию на новой странице
        // this.router.navigate(['/info-page', {msg: 'Вам отправлено письмо для подтверждения аккаунта. Проверьте почту через 1-2 мин.'}]);
      },
      err => {
        this.isLoading = false;
        switch (err.error.exception) {
          case 'UserOrEmailAlreadyExistException' || 'ConstraintViolationException' || 'DataIntegrityViolationException': {
            this.error = `User or email already exists`;
            break;
          }
          default: {
            this.error = `Error`;
            break;
          }
        }
      });
  }
}