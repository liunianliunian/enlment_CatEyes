<template>	
	<div>
		<el-row >
  <el-col :span="12"></el-col>
  <el-col :span="6">
	  	<el-form  label-width="80px" >
		  <el-form-item label="账号">
		    <el-input v-model='acc'></el-input>
		  </el-form-item>
		  <el-form-item label="密码">
		    <el-input v-model='pwd'></el-input>
		  </el-form-item>
		</el-form>
  		<el-button class='elbu el-icon-circle-check' type="primary" @click='reg'>注册</el-button>
  </el-col>
  <el-col :span="6"></el-col>
</el-row>
	</div>

</template>

<script>

import Router from '../../router/index.js';
	export default {
		name:'reg',
		data(){
			return{
				acc:'',
				pwd:''
			}
		},
		methods:{
			reg(){

				Router.push('/')
			}
		}
	}

</script>

<style>
	.elbu{
		margin-left: 100px;
	}
</style>