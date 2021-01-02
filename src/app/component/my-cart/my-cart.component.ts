import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  panelOpenState = true;
  customerForm: FormGroup;
  books: Array<any> = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      PhoneNumber: new FormControl(),
      PinCode: new FormControl(),
      Locality: new FormControl(),
      Address: new FormControl(),
      City: new FormControl(),
      LandMark: new FormControl(),
    });
    this.books = JSON.parse(localStorage.getItem('addedtocart'));
    console.log(this.books);
  }
  checkout() {
    this.router.navigate(['order']);
  }
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
}
