import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Product } from '../interfaces/product.interface';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class ProductsService {

  ServiceURL = 'http://localhost:8084/HulkStore/services/products';

  constructor(private http: Http) {}

  getProducts() {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ServiceURL + '/getProducts', '', { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }

  getProduct(product: Product) {
    const body = JSON.stringify(product);
    console.log(body);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ServiceURL + '/getProduct', body, { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }

  newProduct(product: Product) {
    const body = JSON.stringify(product);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ServiceURL + '/setProduct', body, { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }

  updateProduct(product: Product) {
    const body = JSON.stringify(product);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ServiceURL + '/putProduct', body, { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }

  deleteProduct(product: Product) {
    const body = JSON.stringify(product);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.ServiceURL + '/deleteProduct', body, { headers }).map(res => {
      console.log(res.json());
      return res.json();
    });
  }
}
