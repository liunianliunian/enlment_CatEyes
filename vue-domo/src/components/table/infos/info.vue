			
<template>	
	<div class='box'>
		<el-row class="grid-content bg-purple-dark">
			  	后台猫眼管理系统
				  <el-color-picker></el-color-picker>
		</el-row>
		<el-row style='height:600px'>
		  <el-col :span="4"  >
		  	<el-menu router  :default-openeds='array'default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
		      <el-submenu index="1" >
		        <template slot="title"><i class="fa fa-vimeo fa-2x vue_xx" ></i>猫眼电影</template>
		        <el-menu-item-group>
		          <template slot="title">管理信息</template>
		          <el-menu-item index="/info/user"><i class="fa fa-user fa-2x vue_xx"></i>用户管理</el-menu-item>
		          <el-menu-item index="/info/hit"><i class="fa fa-yelp fa-2x vue_xx"></i>正在上映</el-menu-item>
		          <el-menu-item index="/info/next"><i class="fa fa-twitter fa-2x vue_xx"></i>即将上映</el-menu-item>
		          <el-menu-item index="/info/hot"><i class="fa fa-reddit fa-2x vue_xx"></i>热映电影</el-menu-item>
		          <el-menu-item index="/info/match"><i class="fa fa-desktop fa-2x vue_xx "></i>院线管理</el-menu-item>
		          <el-menu-item index="/info/manager"><i class="fa fa-modx fa-2x vue_xx"></i>资讯电影</el-menu-item>
		          <el-menu-item index="/info/flim"><i class="fa fa-camera-retro fa-2x vue_xx"></i>电影管理</el-menu-item>
		          <el-menu-item index="/info/movie"><i class="fa fa-film fa-2x vue_xx"></i>电影院线原理</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>
		    </el-menu>
		  </el-col>
		  <el-col :span="20">
		  	<router-view></router-view>
		  </el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		name:'info',
		data(){
			return{
				array:['1','2']
			}
		},
		methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
	}

</script>

<style scoped>
	h1{
		font-size: 24px;
	}
	a{
		text-decoration: none;
	}
	   
   .grid-content {
	    border-radius: 4px;
	    min-height: 66px;
	    background: #8492A6;
	    text-align: center;
	    line-height: 66px;
	    font-size: 26px;
	    color:white;
	    letter-spacing: 6px;
	  }
		
	.vue_xx{
			margin-right: 30px;
		}

</style>