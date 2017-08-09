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
			const a=window.screen.height;
			const b=window.screen.width;
			const c=document.getElementById('app');
			c.style.width=b+'px'
			c.style.height=a+'px'
		}
}

</script>

<style>
#app{
	background: url('images/timg.jpg') no-repeat center;
	overflow: hidden;
}
</style>
