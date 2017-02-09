import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isLoggedIn()
  }
}
