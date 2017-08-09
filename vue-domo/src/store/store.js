import Vue from "vue"
import Vuex from "vuex"


import emp from "../components/table/infos/store.js"

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		emp
	}
})


