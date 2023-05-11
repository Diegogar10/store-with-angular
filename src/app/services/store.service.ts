import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Cart[] = [];
  private myCart = new BehaviorSubject<Cart[]>([]);
  myCart$ = this.myCart.asObservable();


  addProduct(product: Product) {
    if(!this.myShoppingCart.length){
      this.myShoppingCart.push({
        id: product.id,
        qty: 1,
        product: product
      });
    }else {
      const index = this.myShoppingCart.findIndex(data => data.id === product.id);
      if(index != -1){
        const prod = this.myShoppingCart[index];
        this.myShoppingCart.splice(index,1);
        this.myShoppingCart.push({
          ...prod,
          qty:prod.qty + 1,
        })
      }else {
        this.myShoppingCart.push({
          id: product.id,
          qty: 1,
          product: product
        });
      }
    }
    this.myCart.next(this.myShoppingCart);
  }
  getShoppingCart():Cart[] {
    return this.myShoppingCart;
  }
  getTotalItems() {
    if(this.myShoppingCart.length===0){
      return 0;
    }
    return this.myShoppingCart.map(dta=>dta.qty).reduce((a,b)=>a+b);
  }
  getTotalPrice() {
    return this.myShoppingCart.map(dta=>dta.product.price*dta.qty).reduce((a,b)=>a+b);
  }
  incrementItem(id: string){
    const index = this.myShoppingCart.findIndex(data => data.id === id);
    const prod = this.myShoppingCart[index];
    this.myShoppingCart.splice(index,1);
    this.myShoppingCart.push({
      ...prod,
      qty:prod.qty + 1,
    });
    this.myCart.next(this.myShoppingCart);
  }

  decrementItem(id: string){
    const index = this.myShoppingCart.findIndex(data => data.id === id);
    const prod = this.myShoppingCart[index];
    this.myShoppingCart.splice(index,1);
    this.myShoppingCart.push({
      ...prod,
      qty:prod.qty - 1,
    });
    this.myCart.next(this.myShoppingCart);
  }
  deleteItem(id: string) {
    const index = this.myShoppingCart.findIndex(data => data.id === id);
    this.myShoppingCart.splice(index,1);
    this.myCart.next(this.myShoppingCart);
  }
}
