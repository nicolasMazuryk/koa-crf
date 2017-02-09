import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import AppRouter from './app.routes';

import { MaterializeModule } from 'angular2-materialize';

import {HomepageModule} from "./components/homepage/homepage.module";

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from "./services/auth/auth.service";
import { ToastService } from "./services/toast/toast.service";

import { LoggedInGuard } from "./guards/loggedIn.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    AppRouter,

    HomepageModule
  ],
  providers: [AuthService, ToastService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
