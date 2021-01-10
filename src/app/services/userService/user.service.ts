import { Injectable } from '@angular/core';
import {HttpService} from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { }
  registerUser(data){
    console.log("data in user service", data);
    return this.httpService.post('User/Register',data);
  }
  loginUser(data) {
    console.log("data in user service", data);
    return this.httpService.post('User/Login', data);
  }
  customerDetails(data:any){
    console.log("data in user service",data);
    return this.httpService.post('CustomerDetails/AddCustomerDetails',data);
  }
  orderPlaced(data){
    console.log("data in user service", data);
    return this.httpService.postCart('Order/PlaceOrder',data)
  }
}
