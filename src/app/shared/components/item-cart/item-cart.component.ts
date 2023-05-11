import { Component, Input } from '@angular/core';
import { ProductItem } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss']
})
export class ItemCartComponent {

  constructor (
    private store: StoreService
  ){}

  @Input() product: ProductItem = {
    'id':'',
    'qty':0,
    'image':'',
    'price':0,
    'title':''
  };

  incrementItem(){
    this.store.incrementItem(this.product.id);
  }

  decrementItem(){
    this.store.decrementItem(this.product.id);
  }
  deleteItem() {
    this.store.deleteItem(this.product.id);
  }
}
