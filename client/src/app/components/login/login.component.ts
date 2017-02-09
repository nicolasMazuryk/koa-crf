import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'crf-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {};

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(user) {
    console.log(user)
    this.authService.login(user).subscribe(result => {
      if (result) {
        this.router.navigate([''])
      }
    })
  }

  ngOnInit() {
  }

}
