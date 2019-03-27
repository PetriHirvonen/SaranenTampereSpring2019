import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {ShoppingList} from './components/shoppinglist/shoppinglist.component';
import {ShoppingForm} from './components/shoppingform/shoppingform.component';

import {ShoppingService} from './services/shoppingservice.service';

@NgModule({
  declarations: [
    AppComponent,
	ShoppingList,
	ShoppingForm
  ],
  imports: [
    BrowserModule,
	FormsModule
  ],
  providers: [ShoppingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
