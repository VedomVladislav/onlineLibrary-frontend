import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { RegisterComponent } from './auth/register/register.component';
import { MustMatchDirective } from './auth/directive/must-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MustMatchDirective
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
