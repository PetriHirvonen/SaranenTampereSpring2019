<template>
  <div>
    <h1>Hello, {{ name }}</h1>
	<h1>{{helloMessage}}</h1>
  </div>
</template>

<script>
export default {
  name: 'MyFirstComponent',
  props: {
    name: String
  },
  computed: {
	helloMessage:function() {
		return "Nice to meet you "+this.name;
	}
  }
}
</script>