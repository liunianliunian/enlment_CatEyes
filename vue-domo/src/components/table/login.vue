<template>	
<div id='op'>
	<el-row >
	  <el-row   class='Image'>
		  <img src="./../../images/6666.png"  alt="" class='h_image'>
      </el-row >

	  <el-col :span="12"></el-col>
	  <el-col :span="6" id='content'>
		  	<el-form  label-width="80px" style='margin-top: 40px' >
			  <el-form-item label="用户名">
			    <el-input class='input' ></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input class='input'></el-input>
			  </el-form-item>
			</el-form>
			<el-row >
		  		<el-button class='elbu el-icon-circle-check' type="primary" @click='login'>登录</el-button>
			  	<el-button class='el-icon-picture' type="primary" @click='reg'>注册</el-button>
		  	</el-row >
	  </el-col>
	  <el-col :span="6"></el-col>
	</el-row>
</div>


</template>

<script>

import Route from '../../router/index.js';
import NProgress from 'nprogress'

	export default {
		name:'login',
		methods:{
			login(){
				setTimeout(function(){
					localStorage.isLogin=true;
					Route.push('/info')
				},1000)
				
			},
			reg(){
				
				Route.push('/reg')
			}

		},
		created(){
			NProgress.start() 
			NProgress.set(0.8) 
		},
		mounted(){
			const a=window.screen.height/2;
			const c=window.screen.width/2;
			const b=document.getElementById('op');
			const d=document.getElementById('content')
			b.style.marginTop=(a-200)+'px';
			d.style.marginLeft=(c-200)+'px';
			NProgress.done() 
		}
	}

</script>

<style>
.elbu{
	margin-left: 120px;
}
#content{
	background-color:#8492A6;
	filter: blur(4);
	border-radius: 4px;
	width: 400px;
	height: 200px;
	box-shadow: 0 0 4px 4px #8492A6;
	animation: ss 0.5s linear 0s  normal;
}
.input{
	width: 280px;
}
.el-form-item__label{
	color:white;
}
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .Image{
  	text-align: center;
  	
  }
  .h_image{
  	 animation: cz 20s linear 0s infinite normal;
  	
  }
  @keyframes cz {
        0%{
            transform:rotateY(0deg);
        }
        20%{
            transform:rotateY(120deg);
        }
        40%{
            transform:rotateY(240deg);
        }
        60%{
            transform:rotateY(360deg);
        }
        80%{
          transform:rotateY(240deg);            
     	}
        100%{
           transform:rotateY(120deg);;
        }
    }
    @keyframes ss{
    	from{
    		transform: scale(0.4);
    	}
    	to{
    		transform: scale(1);
    	}
    }

</style>