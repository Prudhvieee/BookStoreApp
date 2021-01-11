import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import { CartService } from 'src/app/services/cartService/cart.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private formbuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}
  header: FormGroup;
  name: any;
  email: any;
  //@Input() childMessage=this.cartService.bag;
  @Input() childMessage: number | undefined; 
  wishlist: Array<any> = [];
  books: Array<any> = [];

  ngOnInit(): void {
    this.header = this.formbuilder.group({
      dataa: [''],
    });
    this.cartService.bag
    this.cartItems();
    //this.cartService.getCartItems();
  }
  goToCart() {
    this.router.navigate(['my-cart']);
  }
  dashboard() {
    this.router.navigate(['dashboard']);
  }
  cartItems() {
    this.bookService.cartItems().subscribe((res) => {
      console.log('cartItems', res);
      this.books = res['result'];
      console.log('books array length', this.books.length);
      this.childMessage = this.books.length;
    });
  }
  goToWishlist(){
    this.router.navigate(['wishlist']);
  }
}
