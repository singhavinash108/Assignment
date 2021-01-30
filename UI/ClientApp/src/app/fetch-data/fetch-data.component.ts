import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserActivity } from '../models/userActivity.Model';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public userActivities: UserActivity[];

  constructor(private dataService: DataService,) {

  }

  ngOnInit() {
    this.dataService.getAllUserActivities().subscribe(result => {
      this.userActivities = result;
    }, error => console.error(error));
  }


  get RegisteredUserEmail() {
    return this.dataService.RegisteredUserEmail;
  }
  get registered() {
    return this.dataService.registered;
  }
}


