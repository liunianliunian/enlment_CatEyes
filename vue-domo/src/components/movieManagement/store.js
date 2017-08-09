export const GET_BYEMLEMENT='GET_BYEMLEMENT'
export const GETPAGE='GETPAGE'
export const DEL_PP='DEL_PP'
export const MOHU=MOHU
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
		
	},
	actions:{
		
		}
}