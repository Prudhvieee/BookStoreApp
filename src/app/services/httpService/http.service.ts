import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl=environment.baseUrl
  token:any;
  constructor(private http:HttpClient) { }
  post(url: string,data: any){
    console.log(" data in http ", data);
    return this.http.post(this.baseUrl + url , data);
  }
  postCart(url: string,data: any){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      })
    }
    this.token = localStorage.getItem('token')
    console.log(" data in http ", data);
    return this.http.post(this.baseUrl + url , data,options);
  }
  get(url:any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      })
    }
    this.token = localStorage.getItem('token')
    console.log("options in httpservice ", options);
    return this.http.get<any>(this.baseUrl + url,options);
  }
}
