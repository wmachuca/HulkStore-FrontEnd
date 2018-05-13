import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: Product = {
    id: '',
    name: '',
    brand: '',
    quantity: 0
  };

  brandAlt = '';
  new = false;
  id: string;

  constructor(
    private _productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        console.log(params);
        this.id = params['id'];
      });
      if (this.id !== 'new') {
        this.product.id = this.id;
        _productService.getProduct(this.product)
          .subscribe(data => {
            if (data.error) {
              console.log(data.message);
            } else {
              this.product = data.product;
              this.checkBrand();
            }
          });
      }
    }

  save() {
    if (this.product.brand === 'Otro') {
      this.product.brand = this.brandAlt;
    }
    console.log(this.product);
    if (this.id === 'new') {
      this._productService.newProduct(this.product)
        .subscribe(data => {
          if (data.error) {
            console.log(data.message);
          } else {
            this.product = data.product;
            this.router.navigate(['product', data.product.id]);
          }
        });
    } else {
      this._productService.updateProduct(this.product)
      .subscribe(data => {
        if (data.error) {
          console.log(data.message);
        } else {
          this.product = data.product;
          this.router.navigate(['product', data.product.id]);
        }
      });
    }
  }

  newProduct() {
    this.product = {
      id: '',
      name: '',
      brand: '',
      quantity: 0
    };
    this.router.navigate(['product', 'new']);
  }

  checkBrand() {
    if (this.product.brand !== 'Marvel' && this.product.brand !== 'DC') {
      this.brandAlt = this.product.brand;
      this.product.brand = 'Otro';
    }
  }

  ngOnInit() {}

}
