<template>
  <div id="app">
	<router-view></router-view>	
  </div>
</template>

<script>

// import todoList from './components/todoList/todo.vue';

export default {
  name: 'app',
  mounted(){
			const a=document.body.scollHeight;
			const b=document.body.scollWidth;
			const c=document.getElementById('app');
			c.style.width=b+'px'
			c.style.height=a+'px'
		}
}

</script>

<style>
#app{
	background-color: #EFF2F7;
	overflow: hidden;
}
</style>
