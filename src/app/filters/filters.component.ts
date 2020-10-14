import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  onChange(filterKey, option){
    let filters = this.productService.filters.getValue();
    filters = filters.map(x => {
      if (x.key === filterKey) {
        x.selectedOption = option;
      }
      return x;
    });
    this.productService.filters.next(filters);
  }

  getSelectedOption(key: string): string{
    const filter = this.productService.filters.getValue()
      .filter(x => x.key === key)[0];
    return filter.selectedOption;
  }

  resetFilters() {
    this.productService.resetFilters();
  }
}
