import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
  }

  search($event) {
    console.log($event.target.value);
    this.productService.search($event.target.value);
  }
}
