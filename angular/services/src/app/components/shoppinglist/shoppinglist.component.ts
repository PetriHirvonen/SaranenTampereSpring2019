import {Component} from '@angular/core';
import {ShoppingService} from '../../services/shoppingservice.service';
import {ShoppingItem} from '../../models/shoppingitem.model';

@Component({
	selector:"shoppinglist",
	templateUrl:"./shoppinglist.component.html"
})
export class ShoppingList {
	
	shoppingitems:ShoppingItem[] = [];
	
	constructor(private _service:ShoppingService){

	}
	
	getList() {
		this.shoppingitems = this._service.getList();
	}
	
	remove(index) {
		this._service.remove(index);
		this.getList();
	}
}