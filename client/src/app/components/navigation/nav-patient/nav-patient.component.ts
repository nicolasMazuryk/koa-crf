import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crf-nav-patient',
  templateUrl: './nav-patient.component.html',
  styleUrls: ['./nav-patient.component.scss']
})
export class NavPatientComponent implements OnInit {
  selected: boolean

  constructor() { }

  ngOnInit() {
    this.selected = true
  }

}
