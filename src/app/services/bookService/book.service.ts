import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpService: HttpService) {}

  getBook() {
    return this.httpService.get('Product/GetProducts');
  }
  addcart(book){
    return this.httpService.postCart('Cart/AddCart',book);
  }
  cartItems(){
    return this.httpService.get('Cart/GetCartItems');
  }
  removeItem(num){
    return this.httpService.postCart('Cart/RemoveCartItem?productId='+num,{});
  }
  reduceQuantity(product_id,quantityToRemove){
    return this.httpService.postCart('Cart/ReduceBookQuantity?productId='+product_id+'&quantityToRemove='+quantityToRemove,{})
  }
  updateQuantity(data){
    return this.httpService.postCart('Cart/UpdateCart',data)
  }
}
