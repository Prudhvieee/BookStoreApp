import { Injectable } from '@angular/core';
import { BookService } from '../bookservice/book.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private bookService: BookService) {}
  books: Array<any> = [];
  bag: any;
  getCartItems() {
    var item=this.bookService.cartItems().subscribe((response: any) => {
      this.books = response['result'];
      console.log('booksArray in cart service', this.books);
      console.log('length of array', this.books.length);
      this.bag = this.books.length;
      console.log(this.bag,'prudhvi in cs')
      return this.bag;
    });
    console.log(item,'prudhvi in citem')
    return item;
  }
}
