import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  categories: Category[] = [];
  activeMenu = false;
  counter = 0;
  email = '';


  constructor(
    private storeService: StoreService,
    private authServices: AuthService,
    private categoriesServices: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(()=> {
      this.counter = this.storeService.getTotalItems();
    })
    this.getAllCategories();
    this.authServices.myUser$
    .subscribe(user => {
      if(user) {
        this.email = user.email
      }
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
/*   login() {
    //this.authServices.loginAndGet('admin@mail.com','admin123')
    this.authServices.loginAndGet('diego@gmail.com','12346')
    .subscribe(()=>{
      this.router.navigate(['/profile'])
    });
  } */
  getAllCategories() {
    this.categoriesServices.getAll()
    .subscribe(categories => this.categories.push(...categories));
  }

  logout() {
    this.authServices.logout();
    this.email = '';
    this.router.navigate(['/home']);
    this.activeMenu = false
  }

}
