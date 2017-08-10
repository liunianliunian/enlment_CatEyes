export const SAVE_DATA='SAVE_DATA'

import axios from "axios"
export default{
	namespaced: true,
	state:{
		data:[]
	},
	mutations:{
		[SAVE_DATA](state,{data}){
			state.data = data
		}
	},
}
