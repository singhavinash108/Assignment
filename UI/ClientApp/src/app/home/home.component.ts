import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserActivity } from "../models/userActivity.Model";
import { CustomvalidationService } from "../Services/customvalidation.service";
import { DataService } from "../Services/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {


  constructor(
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
  }



  get registered() {
    return this.dataService.registered;
  }
}
