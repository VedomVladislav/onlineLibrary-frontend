import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'library-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  private uuid: string;
  private isLoading = true;
  private error: string;

  constructor(
    private currentRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(params => {
      this.uuid = params.uuid;

      this.authService.activateAccount(this.uuid).subscribe(
        result => {
          this.isLoading = false;
          if (result) {
            this.router.navigate(['/info-page', {msg: 'You account successfully activated.'}])
          } else {
            this.router.navigate(['info-page', {msg: 'Your account is not activated. Please try again.'}])
          }
        },
        err => {
          this.isLoading = false;
          switch(err.error.exception) {
            case 'UserAlreadyActivatedException': {
              this.router.navigate(['info-page', {msg: 'Your account already activated.'}]);
              break;
            }
            default: {
              this.error = 'Activation error. Please try again Sign up.';
              break;
            }
          }
        }

      )
    })
  }

}