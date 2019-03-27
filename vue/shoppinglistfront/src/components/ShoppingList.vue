<template>
	<div>
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Price</th>
					<th>Count</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in list" :key="item.id">
					<td>{{item.type}}</td>
					<td>{{item.price}}</td>
					<td>{{item.count}}</td>
					<td><button v-on:click="remove(item.id)">Remove</button></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name:"ShoppingList",
	props:["list"],
	methods: {
		remove:function(id) {
			this.$emit("remove-item",id);
		}
	}
}	

</script>








