import {Component} from '@angular/core';
import {ShoppingItem} from '../../models/shoppingitem.model';


@Component({
	selector:"myform",
	templateUrl:"./myform.component.html"	
})
export class MyForm {
	
	shoppingitem:ShoppingItem;
	shoppingitems:ShoppingItem[] = [];
	
	constructor() {
		this.shoppingitem = new ShoppingItem("",0,0);
	}
	
	addToList() {
		this.shoppingitems.push(this.shoppingitem);
		this.shoppingitem = new ShoppingItem("",0,0);
	}
	
	remove(index) {
		this.shoppingitems.splice(index,1);
	}
}