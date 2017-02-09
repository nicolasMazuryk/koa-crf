import { NgModule } from '@angular/core'

import {NavigationModule} from "../navigation/navigation.module";
import {HomepageComponent} from "./homepage.component";
import {HeaderComponent} from "../header/header.component";
import {PatientInfoComponent} from "../patient-info/patient-info.component";
import {VisitComponent} from "../visit/visit.component";

@NgModule({
  declarations: [
    HomepageComponent,
    HeaderComponent,
    PatientInfoComponent,
    VisitComponent
  ],
  imports: [
    NavigationModule
  ]
})
export class HomepageModule { }
