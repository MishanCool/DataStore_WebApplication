import { NgForm } from '@angular/forms'; // use to compaire user details with database details
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../../shared/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']

})
export class SignInComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  model = {
    email : '',
    password : ''
  };
  emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  serverErrorMessages: string;

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      // success call back function
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },

      // error
      err => {
        this.serverErrorMessages = err.error.message;
      }

    );
  }

}
