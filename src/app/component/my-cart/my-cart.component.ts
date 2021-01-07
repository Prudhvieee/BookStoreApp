import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { GetbooksComponent } from '../getbooks/getbooks.component';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  @Input() booksArray: Array<any> = [];
  panelOpenState = true;
  customerForm: FormGroup;
  books: Array<any> = [];
  addedBooks: Array<any> = [];
  i: any = 1;
  constructor(
    private bookService: BookService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

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
    this.cartItems();
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
  add(product: { isValid: boolean; product_id: any }, action: any) {
    product.isValid = true;
    for (let b of this.books) {
      if (product.product_id == b.product_id) {
        if (this.i < 5) {
          this.i++;
        } else {
          this.snackbar.open('You cannot make quantity more than', action, {
            duration: 2000,
          });
          product.isValid = false;
        }
      }
    }
  }
  remove(product: { isValid: boolean; product_id: any }, action: any) {
    product.isValid = true;
    for (let b of this.books) {
      if (product.product_id == b.product_id) {
        if (this.i > 1) {
          this.i--;
        } else {
          this.snackbar.open('You cannot make quantity less than', action, {
            duration: 2000,
          });
          product.isValid = false;
        }
      }
    }
  }
  removeItem(product) {
    console.log('product_id', product);
    this.books.splice(product, 1);
    this.bookService.removeItem(product.product_id).subscribe((res) => {
      console.log('remove item', res);
    });
  }
  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array', this.books);
    });
  }
}
