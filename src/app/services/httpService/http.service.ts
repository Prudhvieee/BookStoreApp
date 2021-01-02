import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }
  post(url: string,data: any){
    console.log(" data in http ", data);
    return this.http.post(this.baseUrl + url , data);
  }
  get(url:any) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmViZWFiMDBmOTAyYTAwMTc2YjZiN2QiLCJpYXQiOjE2MDkzOTEyNDYsImV4cCI6MTYwOTQ3NzY0Nn0.u-BVCrDdq7WG0hOLQbIRZAzXs7G_Smd2KqjiKSCN2wU'
      })
    }
    return this.http.get<any>(this.baseUrl + url,options);
  }
}
