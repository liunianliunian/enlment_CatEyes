<template>
	<div style='width:400px;margin-top: 30px;color:#ADCCF2'>
		<div style='font-size: 22px'>新增影院 </div>
		<el-form :label-position="labelPosition" label-width="80px" >
			  <el-form-item label="影院" >
			    <el-input v-model="name"></el-input>
			  </el-form-item>
			  <el-form-item label="地址">
			    <el-input v-model="region"></el-input>
			  </el-form-item>
			  <el-form-item label="电话">
			    <el-input v-model="phone"></el-input>
			  </el-form-item>
		</el-form>
		<div style='text-align: center'><el-button @click='addFilm'>确认添加</el-button><el-button @click='pthy'>返回</el-button></div>
	</div>
</template>
<script >
import Route from '../../router/index.js'
import {Post} from '../../api/api.js'
	export default{
		name:'movie',
		data(){
			return{
				labelPosition: 'right',
			      name: '',
			      region: '',
			      phone: ''
	       
			}
		},
		methods:{
			pthy(){
				Route.push('/info/movie')
			},
			addFilm(){
				if(this.name && this.region && this.phone ){
					Post('/cinemas/add',{name:this.name,adress:this.region,tel:this.phone}).then((res)=>{
						console.log(res.data)
						Route.push('/info/movie')
					})
				}
				
			
			}
		}
	}
</script>
<style>
	el-input{
		width:300px;
	}
</style>