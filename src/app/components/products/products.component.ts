import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  product: Product = {
    id: '',
    name: '',
    brand: '',
    quantity: 0
  };

  constructor(
    private _productService: ProductsService,
    private router: Router) {
      this.getProducts();
  }

  getProducts() {
    this.products = [];
    this._productService.getProducts()
      .subscribe(data => {
        if (data.error) {
          console.log(data.message);
        } else {
          console.log('Ok');
          // tslint:disable-next-line:prefer-const
          for (let key$ in data.products) {
            if (data.products[key$]) {
              this.products.push(data.products[key$]);
            }
          }
          console.log(this.products);
        }
      });
  }

  updateProduct(id: string, op: string) {
    this.product.id = id;
    this._productService.getProduct(this.product)
      .subscribe(data => {
        if (data.error) {
          console.log(data.message);
        } else {
          this.product = data.product;
          if (op === 'add') {
            this.product.quantity++;
          } else {
            this.product.quantity--;
          }
          this._productService.updateProduct(this.product)
            .subscribe(dataUpdt => {
              if (dataUpdt.error) {
                console.log(dataUpdt.message);
              } else {
                this.product = {
                  id: '',
                  name: '',
                  brand: '',
                  quantity: 0
                };
                this.getProducts();
              }
            });
        }
      });
  }

  setDelete(id) {
    this.product.id = id;
  }

  confirmDelete() {
    this._productService.deleteProduct(this.product)
      .subscribe(dataDel => {
        if (dataDel.error) {
          console.log(dataDel.message);
        } else {
          this.product = {
            id: '',
            name: '',
            brand: '',
            quantity: 0
          };
          this.getProducts();
        }
      });
  }

  ngOnInit() {
  }

}
