import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: Product[] = [];
  categoryId: string | null = null;
  limit = 0;
  offset = 10;

  constructor(
    private route: ActivatedRoute,
    private productsServices: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId) {
          return this.productsServices.getByCategory(this.categoryId, this.limit, this.offset);
        }
        return []
      })
    )
    .subscribe(data => this.products=data);
  }
}
