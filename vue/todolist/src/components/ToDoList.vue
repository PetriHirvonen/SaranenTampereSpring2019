<template>
<div>
	<label>Enter new ToDo:</label>
	<input type="text" 
			v-model="currentToDo"
			v-on:keyup.enter="addToList()"/>
	<hr/>
	<ul v-if="toDoItems.length">
		<li v-for="(item,index) in toDoItems" :key="item.id">
				{{item.todo}}
				<button v-on:click="remove(index)">Do!</button>
		</li>
	</ul>
	<p v-else>Nothing to do</p>
</div>
</template>

<script>
export default {
	name:"ToDoList",
	data: function() {
		return {
			currentToDo:"",
			toDoItems:[],
			currentId:100		
		}	
	},
	methods: {
		addToList:function() {
			this.toDoItems.push({
				id:this.currentId,
				todo:this.currentToDo
			});
			this.currentId++;
			this.currentToDo="";
		},
		remove:function(index) {
			this.toDoItems.splice(index,1);
		}
	}
	
}
</script>