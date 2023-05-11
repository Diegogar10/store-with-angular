import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap, zip } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  //myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  //@Input() productId: string | null = null;
  @Input() set productId(id: string | null) {
    if(id) {
      this.onShowDetail(id);
    }
  };
  @Output() pushLoadMore = new EventEmitter();
  showProductDetail = false;

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    //this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product:Product){
    this.storeService.addProduct(product);
    //this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  onShowDetail(id: string) {
    //this.toggleProductDetail();
    this.statusDetail = 'loading'
    if(!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getProduct(id)
    .subscribe({
      next:(data)=>{
        this.productChosen = data;
        this.statusDetail = 'success'
      },
      error: (response) => {
        console.log(response);
        this.statusDetail = 'error'
      },
      complete: () => {

      }
    })
    /* Descontinuado aunque funciona
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success'
    }, response => {
      console.log(response.error.message);
      this.statusDetail = 'error'
    }
    ); */
  }

  //manejo de peticiones multiples
  //evitando callback hell
  readAndUpdate(id: string) {
    this.productService.getProduct(id)
    .pipe(
      switchMap((product) => this.productService.update(product.id,{title:'change'}))
    )
    .subscribe(data => {
      console.log(data);
    });
    // manejo de varias peticiones a la vez como
    // promise.all
    zip(
      this.productService.getProduct(id),
      this.productService.update(id, {title: 'nuevo'})
    )
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto 012',
      description: 'this is a description',
      images: [''],
      price: 140,
      categoryId: 3
    }
    this.productService.create(product).
    subscribe(data => {
      console.log('Created',data);
      this.products.unshift(data);
    });
  }
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'new title'
    }
    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.toggleProductDetail();
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    })
  }
  onLoadMore() {
    this.pushLoadMore.emit();
  }
}
