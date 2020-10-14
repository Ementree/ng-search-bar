import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {query} from '@angular/animations';
import {BehaviorSubject, concat, forkJoin, Observable, of} from 'rxjs';
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

  searchObs = this.productService.searchStream.pipe(
    debounceTime(2),
    distinctUntilChanged(),
    switchMap((searchQuery: string) => this.productService.search(searchQuery))
  );

  filterObs: Observable<Product[]> = this.productService.filters.pipe(
    switchMap((filters) => this.productService.filterProducts(filters)));

  public products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(this.productService.productArr);

  ngOnInit(): void {
    combineLatest([this.searchObs, this.filterObs]).subscribe(([filterResult, searchResult]) => {
      this.products$.next(filterResult.filter(value => searchResult.includes(value)));
    });
  }
}
