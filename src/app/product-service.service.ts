import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public Products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  constructor() {
  }
  getProducts(){

  }
}
