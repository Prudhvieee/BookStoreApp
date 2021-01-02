import { Injectable } from '@angular/core';
import {HttpService} from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { }
  registerUser(data: { firstName: any; lastName: any; email: any; password: any; service: string; }){
    console.log("data in user service", data);
    return this.httpService.post('bookstore_user/registration',data);
  }
  loginUser(data) {
    console.log("data in user service", data);
    return this.httpService.post('bookstore_user/login', data);
  }
}
