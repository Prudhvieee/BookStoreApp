import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Array<any> = [];
  book:any;
  constructor(private router: Router,private userService:UserService) { }

  ngOnInit(): void {
  }
  goToDashboard(){
    this.router.navigate(['dashboard'])
  }
  orderPlaced(book: any) {
    this.userService.orderPlaced(book).subscribe((res) => {
      this.orders=res['result'];
      console.log(this.orders);
    });
  }
}
