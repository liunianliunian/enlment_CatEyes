<template>
	<div>院线管理
		<input type='button' value='测试' @click='clickon'>
	</div>
</template>
<script >
import api from '../../api/index.js'
	export default{
		name:'cinemaManagement',
		methods:{
			clickon(){
				api.getUser('/user/del',{acc:'123',submitType:'findJoin',ref:'users'}).then((res)=>{
					console.log(res.data)
				})
			}
		}
	}
</script>
<style>
	
</style>