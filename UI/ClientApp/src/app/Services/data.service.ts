import { Injectable } from '@angular/core';
import { UserActivity } from '../models/userActivity.Model';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  RegisteredUserEmail:string ="singh.avinash108@gmail.com";
  registered = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  addUserAcitivy(userActivityModel: UserActivity) {
  return  this.http.post<UserActivity>(this.baseUrl + 'api/UserActivity',userActivityModel);
  }

  getAllUserActivities(){
    return  this.http.get<UserActivity[]>(this.baseUrl + 'api/UserActivity');
  }
}
