import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {

  header!: FormGroup;
  name:any;
  email:any;
  bag=0;
  list:any;
  
  constructor(private formbuilder:FormBuilder,private router: Router,) { }

  ngOnInit(): void {
    this.header=this.formbuilder.group({
      dataa:[""]
    })
  }
  clickBag(){
    this.bag=this.bag+1;
  }
  goToCart(){
    this.router.navigate(['my-cart']);
  }
  dashboard(){
    this.router.navigate(['dashboard']);
  }
}
