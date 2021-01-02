import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/bookservice/book.service';
import{HeaderComponent} from '../header/header.component';
@Component({
  selector: 'app-getbooks',
  templateUrl: './getbooks.component.html',
  styleUrls: ['./getbooks.component.scss'],
})
export class GetbooksComponent implements OnInit {
  constructor(private bookService: BookService, private router: Router) {}
  booksArray: Array<any> = [];
  cartItems: Array<any> = [];
  @Input() bag:number;
  ngOnInit() {
    this.getAllBooks();
  }
  getAllBooks() {
    this.bookService.getBook().subscribe((response) => {
      console.log(response);
      this.booksArray = response['result'];
      console.log(' books array ', this.booksArray);
    });
  }
  addcart(book) {
    this.cartItems.push(book);
    localStorage.setItem('addedtocart',JSON.stringify(this.cartItems));
    console.log()
  }
  review() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }
}
