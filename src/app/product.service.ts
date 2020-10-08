import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productArr: Product[] = [
    {
      name: 'Test',
      rate: 5,
      description: 'desc',
      id: 1,
      price: 166
    },
    {
      name: 'Text',
      rate: 3,
      description: 'desc',
      id: 2,
      price: 1166
    }
  ];

  public products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.productArr);
  private searchQuery = '';
  private rating: number | null;

  constructor() {
  }

  search(query: string): Ob {
    this.searchQuery = query;
    this.products.next(this.productArr.filter((product: Product) => {
      console.log(product.name);
      return product.name.toLowerCase().startsWith(query.toLowerCase());
    }));
  }

  filterByRating(rating: number) {
    this.rating = rating;
    const value = this.Products.getValue();
    this.Products.next(value.filter((product: Product) => {
      return product.rate === rating;
    }));
  }

  aggregate() {

  }
}
