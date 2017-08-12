<template>
	<el-row type="flex" class="row-bg">
	  <el-col :span="24">
		<div>
			<el-button type="primary">所有电影</el-button>
		</div>
		
		<el-table
		ref="table"
	    :data="page.rows"
	    style="width: 100%"
	    @select = 'select'
	    @select-all = "select_all"
	    :row-class-name="tableRowClassName">
	        <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      prop="f_chn"
		      label="电影中文名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="f_eng"
		      label="电影英文名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="f_garde"
		      label="评分"
		      width="180">
		    </el-table-column>
			<el-table-column
		      prop="f_time"
		      label="总时长">
		    </el-table-column>
		  </el-table>
		<div class="addBtn">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="page.curpage"
		      :page-sizes="[10, 20, 30]"
		      :page-size="page.eachpage"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="page.total">
		    </el-pagination>
		 	<el-button type="success" class="btnFilm" @click = "addFilm">添加电影</el-button>	
		</div>	
		

	  </el-col>
	</el-row>
</template>
<script >
	import { Post, Get } from "../../utils/utils.js"
	import { mapMutations } from 'vuex'
	import { SAVE_DATA } from "./store.js"
	import route from "../../router/index.js"
	export default{
		name:'cinemaManagement',
		created(){
			this.getFilm()
			Post("/data/del",{}).then((res)=>{
				
			})

		},
		data(){
			return {
		      	page:{
					eachpage:10,
					maxpage:0,
					curpage:1,
					rows:[],
					total:0
				},
				temporary:[]
		    }
		},
		methods: {
			getFilm(p=1,r=10){
				Post("/film/find",{page:p,rows:r})
				.then((res)=>{
					this.page = res.data
				})	
			},
			handleSizeChange(val) {
				this.getFilm(this.page.curpage,val)
		    },
		    handleCurrentChange(val) {
		    	this.getFilm(val,this.page.eachpage)
		    },
	      	tableRowClassName(row, index) {
		        if (index === 1) {
		          return 'info-row';
		        } else if (index === 3) {
		          return 'positive-row';
		        }
		        return '';
		    },
		    select(selection){
		    	this.temporary = selection
		    },
		    select_all(selection){
		    	this.temporary = selection
		    },
		    addFilm(){
		  		Post("/data/add",{save:this.temporary})
		    	route.push("/info/cinemas")
		    }
	    }
	}
</script>


<style scoped>
	.addBtn>*{
		float: left;
	}
	.btnFilm{
		margin-left: 100px;
	}
</style>