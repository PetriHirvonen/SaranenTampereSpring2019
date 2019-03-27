import {Component} from '@angular/core';
import {ShoppingService} from '../../services/shoppingservice.service';
import {ShoppingItem} from '../../models/shoppingitem.model';

@Component({
	selector:"shoppingform",
	templateUrl:"./shoppingform.component.html"
})
export class ShoppingForm {
	
	shoppingitem:ShoppingItem;
	
	constructor(private _service:ShoppingService) {
		this.shoppingitem = new ShoppingItem("",0,0);
	}
	
	addToList() {
		this._service.addToList(this.shoppingitem);
		this.shoppingitem = new ShoppingItem("",0,0);
	}
}
