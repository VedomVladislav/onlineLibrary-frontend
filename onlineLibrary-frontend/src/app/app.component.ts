import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'library-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  cookieEnabled: boolean = false;

  ngOnInit(): void {
    this.cookieEnabled = navigator.cookieEnabled;

    if (!this.cookieEnabled) {
      document.cookie = 'testCookie';
      this.cookieEnabled = document.cookie.indexOf('testCookie') != -1;
    }
  }

}
