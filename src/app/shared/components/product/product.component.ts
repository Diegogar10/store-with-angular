import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product = {
    id: '1',
    title: 'EL mejor juguete',
    price: 565,
    images: ['./assets/images/toy.jpg'],
    category: {
      id: '0',
      name: ''
    },
    description: ''
  }
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  addCart() {
    this.addedProduct.emit(this.product);
  }
  onShowProductDetail() {
    this.showProduct.emit(this.product.id);
  }
}
