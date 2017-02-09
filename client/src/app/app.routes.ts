import {RouterModule} from '@angular/router'
import {LoginComponent} from "./components/login/login.component"
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoggedInGuard} from "./guards/loggedIn.guard";


const routes = [
  // { path: '', component: HomepageComponent, canActivate: [LoggedInGuard] },
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent }
]

export default RouterModule.forRoot(routes)
