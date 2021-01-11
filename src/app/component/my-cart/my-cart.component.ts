import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { UserService } from '../../services/userService/user.service';
import {CartService} from 'src/app/services/cartService/cart.service';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}
  panelOpenState = true;
  customerForm: FormGroup;
  books: Array<any> = [];
  addedBooks: Array<any> = [];
  i: any = 1;
  bag: number;
  @Input() childMessage: number | undefined;

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      fullAddress: ['', [Validators.required]],
      email: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
    this.cartItems();
  }
  Customer = (customerForm: {
    fullname: any;
    phone: any;
    pincode: any;
    fullAddress: any;
    email: any;
    city: any;
    state: any;
  }) => {
    try {
      let newUser = {
        fullname: customerForm.fullname,
        phone: customerForm.phone,
        pincode: customerForm.pincode,
        fullAddress: customerForm.fullAddress,
        email: customerForm.email,
        city: customerForm.city,
        state: customerForm.state,
      };
      this.userService.customerDetails(newUser).subscribe((response) => {
        console.log('Customer details added sucessfully sucessfully', response);
        this.nextStep();
      });
    } catch (error) {
      console.log(error);
    }
  };
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  updateQuantity(book, action) {
    if (book.quantityToBuy > book.product.quantity) {
      this.snackbar.open('you cannot make quantity more than ', action, {
        duration: 2000,
      });
    } else {
      this.bookService.updateQuantity(book).subscribe((data) => {
        console.log(data, 'quantity increased');
        this.cartItems();
      });
    }
  }
  reduce_quantity(book, quantity: any, action: string) {
    if (book.quantityToBuy > 1) {
      this.bookService
        .reduceQuantity(book.product_id, quantity)
        .subscribe((result) => {
          book.isValid = true;
          this.cartItems();
        });
    } else {
      this.snackbar.open('You cannot make quantity less than', action, {
        duration: 2000,
      });
      book.isValid = false;
    }
  }
  removeItem(product) {
    //this.books.splice(product, 1);
    this.bookService.removeItem(product.product_id).subscribe((res) => {
      console.log('remove item', res);
      this.cartItems();
    });
  }
  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      this.bag = this.books.length;
    });
  }
  checkout() {
    this.router.navigate(['order']);
  }
  orderPlaced(book) {
    this.userService.orderPlaced(book).subscribe((res) => {
      console.log('orderPlaced', res);
      this.checkout();
    });
  }
}
