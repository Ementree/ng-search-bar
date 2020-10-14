import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {Product} from './product';
import {FilterSchema} from './filterSchema';

export class SelectedOption{
  name: string;
  value: string;
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productArr: Product[] = [
    {
      name: 'Test',
      rate: '5',
      description: 'desc',
      id: 1,
      price: '166'
    },
    {
      name: 'Text',
      rate: '3',
      description: 'desc',
      id: 2,
      price: '1166'
    }
  ];
  public searchStream: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filters: BehaviorSubject<FilterSchema[]> = new BehaviorSubject<FilterSchema[]>(this.getFilters());

  constructor() {
  }
  setFilters(){
    this.filters.next(this.getFilters());
  }
  getFilters(): FilterSchema[]{
    const keys = ['name', 'rate', 'description', 'price'];
    return keys.map(x => {
      return {
        key: x,
        name: x,
        selectedOption: '',
        options: this.productArr.map(y => y[x]).filter(this.distinct)
      };
    });
  }
  private distinct(value, index, self){
    return self.indexOf(value) === index;
  }

  filterProducts(filters: FilterSchema[]){
    const selectedValues = filters
      .filter(x => x.selectedOption !== '')
      .map(x => new SelectedOption(x.name, x.selectedOption));
    console.log(selectedValues);
    return of(this.productArr
      .filter(product => {
          const res = selectedValues.map(selected => {
            return product[selected.name] === selected.value;
          });
          return !res.includes(false);
        }
      ));
  }


  search(query: string): Observable<Product[]> {
    this.searchStream.next(query);
    return of(this.productArr
      .filter(x => x.name.toLowerCase().startsWith(query.toLowerCase())));
  }

  aggregate() {

  }
}
