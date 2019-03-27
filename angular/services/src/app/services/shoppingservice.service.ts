import {Injectable} from '@angular/core';
import {ShoppingItem} from '../models/shoppingitem.model';

@Injectable()
export class ShoppingService {
	
	shoppingitems:ShoppingItem[] = [];

	constructor() {
	}
	
	getList() {
		return this.shoppingitems;
	}
	
	addToList(shoppingitem:ShoppingItem) {
		this.shoppingitems.push(shoppingitem);
	}
	
	remove(index) {
		this.shoppingitems.splice(index,1);
	}	
	
}