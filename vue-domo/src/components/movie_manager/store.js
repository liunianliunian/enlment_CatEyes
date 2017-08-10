export const GET_EMP_BY = "GET_EMP_BY"
export const FINDT = "FINDT"
//export const FINDT2 = "FINDT2"


import axios from "axios" //ajax 模块引入

	
	
export default {
	namespaced: true,
	state: {
		page: {
			curpage: 1,
			eachpage: 10,
			maxpage: 0,
			total: 0,
			rows:[]
		}
	},
	mutations: {
//		刷新页面
		[GET_EMP_BY](state,page) {
			state.page = page
		}
	},
	//获取ajax数据
	actions: {
		async [FINDT](context,{page=1,rows = 10} ={}){
			const {
				data
			} = await axios.get("http://localhost:3000/darr/find",{
				params:{
					page,
					rows	
				}
			})
//			console.log(data)
			context.commit(GET_EMP_BY, data)
		}
//		async [FINDT2](context,{index="2"}){
//			const {
//				data
//			} = await axios.get("http://localhost:3000/darr/find",{
//				params:{
//					index
//				}
//			})
//			console.log(data)
//			context.commit(GET_EMP_BY, data)
//		}
	}
	
}