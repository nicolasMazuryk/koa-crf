import { NgModule } from '@angular/core'

import { NavigationComponent } from './navigation.component';
import { NavPatientComponent } from './nav-patient/nav-patient.component';
import { NavDoctorComponent } from './nav-doctor/nav-doctor.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavPatientComponent,
    NavDoctorComponent
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
