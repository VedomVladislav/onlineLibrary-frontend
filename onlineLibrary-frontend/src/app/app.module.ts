import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { MustMatchDirective } from './auth/directive/must-match.directive';
import { InfoPageComponent } from './auth/info-page/info-page.component';
import { ActivateAccountComponent } from './auth/activate-account/activate-account.component';
import { SendEmailResetPasswordComponent } from './auth/reset-password/send-email-reset-password/send-email-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective,
    InfoPageComponent,
    ActivateAccountComponent,
    SendEmailResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
