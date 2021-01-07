import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
@Component({
  selector: 'app-getbooks',
  templateUrl: './getbooks.component.html',
  styleUrls: ['./getbooks.component.scss'],
})
export class GetbooksComponent implements OnInit {
  static booksArray: any;
  // static booksArray: any;
  constructor(private bookService: BookService, private router: Router) {}
 // booksArray: Array<any> = [];
  cartItems: Array<any> = [];
  @Input() bag: number;
  @Input() booksArray: Array<any> = [];
  ngOnInit() {
    this.getAllBooks();
  }
  getAllBooks() {
    this.bookService.getBook().subscribe((response) => {
      console.log(response);
      this.booksArray = response['data'];
      console.log(' books array ', this.booksArray);
    });
  }
  addcart(book) {
    book.added = false;
    for (let b of this.booksArray) {
      if (book.product_id == b.product_id) {
        book.added = true;
      }
    }
    this.bookService.addcart(book).subscribe((res) => {
      console.log('data in cart', res);
    });
  }
  review() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }
}