import { Observable } from "rxjs";
import { PatientService } from "../patient.service";
import { Patient } from "../patient";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.css"]
})
export class PatientsListComponent implements OnInit {
  patients: Observable<Patient[]>;

  constructor(private patientService: PatientService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    let resp = this.patientService.getPatientsList();
    resp.subscribe(result => {
      console.log("Hi");
      console.log(result.data);
      this.patients = result.data;
    },
      error => console.log(error));
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updatePatient(id: number){
    this.router.navigate(['update', id]);
  }
}
