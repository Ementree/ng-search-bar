import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    SearchBarComponent,
    FiltersComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
