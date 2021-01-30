import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UserActivity } from "../models/userActivity.Model";
import { CustomvalidationService } from "../Services/customvalidation.service";
import { DataService } from "../Services/data.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    private customValidator: CustomvalidationService,
    private router: Router
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
            this.resetForm();
            this.dataService.RegisteredUserEmail = this.registerForm.getRawValue().Email;
            Swal.fire('Thank you...', 'Registered Successfully.', 'success').then(()=>{
              this.dataService.registered = true;
            });
            Swal.fire({
              title: 'Thank you...',
              text: 'Registered Successfully. Do you want to view all registered users?',
              icon: 'success',
              confirmButtonText: 'Take me to the listing page'
            }).then((result)=>{
              if (result) {
                this.router.navigate(['records']);
              }
            });

          },
          (error) => {
            console.error(error);
            if (error.error == "User already exists.") {
              this.dataService.RegisteredUserEmail = this.registerForm.getRawValue().Email;

              Swal.fire({
                title: 'Already Exists',
                text: 'User with provided email already exists. Do you want to view all registered users?',
                icon: 'warning',
                confirmButtonText: 'Take me to the listing page'
              }).then((result)=>{
                if (result) {
                  this.router.navigate(['records']);
                }
              });

            }
            else{
              Swal.fire('Something went wrong', JSON.stringify(error.error), 'error');

            }
            this.resetForm();
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
