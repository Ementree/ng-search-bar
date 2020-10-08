import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public Products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);

  constructor() {
  }

  search(query: string) {
    const value = this.Products.getValue();
    this.Products.next(value.filter((product: Product) => {
      return product.name.startsWith(query);
    }));
  }

  filterByRating(min: number, max: number) {
    const value = this.Products.getValue();
    this.Products.next(value.filter((product: Product) => {
      return product.rate >= min && product.rate <= max;
    }));
  }
}
