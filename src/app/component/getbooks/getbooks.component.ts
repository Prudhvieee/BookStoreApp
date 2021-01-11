import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import {CartService} from 'src/app/services/cartService/cart.service';
@Component({
  selector: 'app-getbooks',
  templateUrl: './getbooks.component.html',
  styleUrls: ['./getbooks.component.scss'],
})
export class GetbooksComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router,private cartService: CartService) {}
  booksArray: Array<any> = [];
  books: Array<any> = [];
  bag:any;
  //bag:any=this.cartService.bag;
  @Input() childMessage:number | undefined;

  ngOnInit() {
    this.getAllBooks();
    this.getcartItems();
    //this.cartService.getCartItems()
  }
  getAllBooks() {
    this.bookService.getBook().subscribe((response) => {
      console.log(response);
      this.booksArray = response['data'];
    });
  }
  addcart(book) {
    book.addedToCart = false;
    for (let b of this.booksArray) {
      if (book.product_id == b.product_id) {
        book.addedToCart = true;
      }
    }
    this.bookService.addcart(book).subscribe((res) => {
      console.log('data in cart', res);
      this.getcartItems();
      //this.cartService.getCartItems();
    });
  }
  getcartItems() {
    this.bookService.cartItems().subscribe((res) => {
      this.books = res['result'];
      this.bag = this.books.length;
    });
  }
  addToWishlist(book){
    
  }
}