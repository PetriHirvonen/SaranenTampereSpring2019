<template>
	<div>
		<label>Item type:</label>
		<input type="text" v-model="item.type"/>
		<br/>
		<label>Price:</label>
		<input type="number" v-model="item.price"/>
		<br/>
		<label>Count:</label>
		<input type="number" v-model="item.count"/>
		<br/>
		<button v-on:click="addToList()">Add</button>
	</div>
</template>

<script>
export default {
	name:"ShoppingForm",
	data: function() {
		return {
			item: {
				type:"",
				price:0,
				count:0,
				id:0			
			}
		
		}
	},
	methods: {
		addToList:function() {
			this.$emit("add-to-list",this.item);
			this.item = {
				type:"",
				price:0,
				count:0,
				id:0			
			}
		}	
	}

}

</script>