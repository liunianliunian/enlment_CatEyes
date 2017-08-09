export const GET_BYEMLEMENT='GET_BYEMLEMENT'
export const GETPAGE='GETPAGE'
export const DEL_PP='DEL_PP'
import axios from "axios"
export default{
	namespaced: true,
	state:{
			page:{
				eachpage:10,
				maxpage:0,
				curpage:1,
				rows:[],
				total:0
			}
		},
	mutations:{
		[GETPAGE](state,page){
			state.page=page
		}
	},
	actions:{
		async [GET_BYEMLEMENT](context,{page=1,rows=10}={}){
			const{
					data
				}=await axios.post('http://localhost:3000/users/find',{
					page,
					rows
				})
				context.commit(GETPAGE,data)
			},
		async [DEL_PP](context,{id}){
			const{
					data
				}=await axios.post('http://localhost:3000/users/del',{
					_id:id
				})
				
			}
		},
	

}
