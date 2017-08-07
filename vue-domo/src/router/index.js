import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/table/login.vue"   //登录
import Reg from "../components/table/reg.vue"       //注册
import Info from "../components/table/infos/info.vue"   //展现相关



import f_hit from '../components/inTheaters/inTheaters.vue'  //正在上映
import f_next from '../components/comingSoon/comingSoon.vue' //即将上映
import flim from '../components/movie_manager/movie.vue'     //电影管理
import hot_broad from '../components/HotBroadcast/HotBroadcast.vue'  //热映电影
import manager from '../components/manager_ord/manager_ord.vue' //资讯电影
import match from '../components/cinemaManagement/cinemaManagement.vue'  //院线管理
import movie from '../components/movieManagement/movieManagement.vue' //电影院线管理
import user from '../components/user_manager/user.vue'//用户管理

import ceshi from '../components/movieManagement/ceshi.vue'
import look from '../components/movieManagement/lookFilmHome.vue'

import addFilm from "../components/manager_ord/addFilm.vue"//资讯电影添加电影

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Login',
		component: Login,
		
	},{
		path: '/reg',
		name: 'Reg',
		component: Reg
	},{
		path: '/info',
		name: 'Info',
		beforeEnter(to, from, next){
			if(eval(localStorage.isLogin)) {
				next()
			}
			next(false)},
		component: Info,
		children:[
		{
			path:'hit',
			name:'Emp',
			component: f_hit
		},{
			path:'next',
			name:'f_next',
			component: f_next
		},{
			path:'flim',
			name:'flim',
			component: flim
		},{
			path:'hot',
			name:'hot_broad',
			component: hot_broad
		},{
			path:'manager',
			name:'manager',
			component: manager
		},{
			path:'match',
			name:'match',
			component: match
		},{
			path:'movie',
			name:'movie',
			component: movie
		},{
			path:'user',
			name:'user',
			component: user
		},{
			path:'ceshi',
			name:'ceshi',
			component: ceshi
		},{
			path:'look',
			name:'look',
			component: look
		},{
		path:'/info/addFilm',
		name:'addFilm',
		component:addFilm
		}]
	}]
})