import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart, Product, ProductItem } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  productsList: ProductItem[] = [];
  total: number = 0;
  constructor(
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.store.myCart$
    .subscribe(data => {
      this.productsList = this.mapData(data).sort((a,b)=>{return a.id > b.id ? 1 : -1 });
      this.total = this.store.getTotalPrice();
    });
  }

  mapData(data:Cart[]):ProductItem[]{
    return data.map(item => {
      return {
        id: item.id,
        price: item.product.price,
        qty: item.qty,
        title: item.product.title,
        image: item.product.images[0]
      }
    })
  }
}
