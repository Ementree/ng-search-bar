import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {query} from '@angular/animations';
import {concat, forkJoin, Observable, of} from 'rxjs';
import {combineLatest} from 'rxjs';
import {Product} from '../product';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {


  constructor(public productService: ProductService) {
  }

  obs2 = this.productService.searchStream.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((query) => this.productService.search(query))
  );

  obs1: Observable<Product[]> = this.productService.filters.pipe(
    switchMap((filters) => this.productService.filterProducts(filters)));


  obs$ = this.getProducts();

  getProducts(): Observable<Product[]>{
    let result: Product[];
    forkJoin([this.obs1, this.obs2]).subscribe(data => {
      result = data[0].filter(x => data[1].map(y => y.id).includes(x.id));
    });
    console.log(result);
    return of(result);
  }

  ngOnInit(): void {
  }

}
