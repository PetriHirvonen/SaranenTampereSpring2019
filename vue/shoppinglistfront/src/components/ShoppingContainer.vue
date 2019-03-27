<template>
	<div>
		<ShoppingForm @add-to-list="addToList(...arguments)"/>
		<hr/>
		<ShoppingList v-bind:list="list" @remove-item="removeFromList(...arguments)"/>
	</div>
</template>
<script>
import ShoppingForm from './ShoppingForm.vue';
import ShoppingList from './ShoppingList.vue';

export default {
	name:"ShoppingContainer",
	components: {
		ShoppingForm,
		ShoppingList
	},
	data: function() {
		return {
			list:[]
		}
	},
	created: function() {
		this.getShoppingList();
	},
	methods: {
		getShoppingList:function() {
			let request = {
				method:"GET",
				mode:"cors",
				headers:{"Content-type":"application/json"}
			}
			fetch("/api/shoppinglist",request).then(response => {				
				if(response.ok) {				
					response.json().then(data => {
						//WHEN EVERYTHING GOES RIGHT!
						this.list = data;
					}).catch((error) => {
						console.log(error);
					});					
				} else {
					console.log("Not ok:"+response.status);
				}				
			}).catch((error) => {
				console.log(error);
			});
		},
		addToList: function(item) {
			let request = {
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(item)
			}
			fetch("/api/shoppinglist",request).then(response => {				
				if(response.ok) {
					this.getShoppingList();
					response.json().then(data => {
						//WHEN EVERYTHING GOES RIGHT!
						console.log(data);
					}).catch((error) => {
						console.log(error);
					});					
				} else {
					console.log("Not ok:"+response.status);
				}				
			}).catch((error) => {
				console.log(error);
			});		
		
		},
		removeFromList: function(id) {
			let request = {
				method:"DELETE",
				mode:"cors",
				headers:{"Content-type":"application/json"}				
			}
			fetch("/api/shoppinglist/"+id,request).then(response => {				
				if(response.ok) {
					this.getShoppingList();
					response.json().then(data => {
						//WHEN EVERYTHING GOES RIGHT!
						console.log(data);
					}).catch((error) => {
						console.log(error);
					});					
				} else {
					console.log("Not ok:"+response.status);
				}				
			}).catch((error) => {
				console.log(error);
			});				
		}	
	}
}
</script>






