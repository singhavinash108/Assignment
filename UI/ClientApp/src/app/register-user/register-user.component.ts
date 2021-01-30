import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserActivity } from "../models/userActivity.Model";
import { CustomvalidationService } from "../Services/customvalidation.service";
import { DataService } from "../Services/data.service";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"],
})
export class RegisterUserComponent {
  userActivityModel: UserActivity;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private customValidator: CustomvalidationService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.dataService
        .addUserAcitivy(this.registerForm.getRawValue())
        .subscribe(
          (result) => {
            console.log(result);
            this.dataService.registered = true;
            this.resetForm();
          },
          (error) => {
            console.error(error);
            alert(JSON.stringify(error.error));
            if (error.error == "User already exists.") {
              this.dataService.registered = true;
              this.dataService.alreadyExists = true;
              this.dataService.RegisteredUserEmail = this.registerForm.getRawValue().Email;
            }
          }
        );
    }
  }

  resetForm() {
    this.registerForm = this.formBuilder.group(
      {
        Activity: ["", [Validators.required, Validators.maxLength(50)]],
        Comments: ["", [Validators.required]],
        Email: [
          "",
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        ConfirmEmail: ["", [Validators.required, Validators.maxLength(50)]],
        FirstName: ["", [Validators.required, Validators.maxLength(50)]],
        LastName: ["", [Validators.required, Validators.maxLength(50)]],
      },
      {
        validator: this.customValidator.MatchEmail("Email", "ConfirmEmail"),
      }
    );
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }
}
