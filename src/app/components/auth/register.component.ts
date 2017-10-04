import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from '../../services';

@Component({
  selector: 'ia-register',
  providers: [ AuthService ],
  templateUrl: './register.component.html',
  styleUrls: [],
})
export class RegisterComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  hasError = false;
  pwdIsOk = true;
  error = '';
  username: string;
  password: string;
  confirmation_password: string;
  email: string;

  ngOnInit() {
    this.auth.logout();
  }

  register() {
    this.hasError = false;
    if (this.password !== this.confirmation_password) {
      this.pwdIsOk = false;
      return;
    }
    this.auth.register(this.username, this.password, this.email,
      (res) => {  // nok
        const body = JSON.parse(res._body);
        this.error = body.code;
        this.hasError = true;
      },
      (res) => {  // ok
        console.log(res);
        this.router.navigate(['/login']);
      });
  }
}
