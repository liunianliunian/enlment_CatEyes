<template>
  <div>
		<el-button type="primary" icon="arrow-left" @click = "prevent">返回</el-button>
		
		<el-select v-model="cinemasVal" placeholder="请选择影院" @change="change">
		    <el-option
		      v-for="item in cinemas.rows"
		      :key="item._id"
		      :label="item.name"
		      :value="item._id">
		    </el-option>
		 </el-select>

		<el-select v-model="screensVal" 
		placeholder="请选择放映厅" 
		@change="change1"
		ref="box">
		    <el-option
		      v-for="item in screens"
		      :key="item._id"
		      :label="item.player"
		      :value="item._id">
		    </el-option>
		</el-select>
		
		<el-button type="text" :plain="true"
		@click="increment">添加电影</el-button>

		<el-dialog title="添加上映信息" :visible.sync="dialogFormVisible">
		   <el-form :model="form">
   		    <el-form-item label="某一天" :label-width="formLabelWidth">
		      <!-- <el-input v-model="form.day" auto-complete="off"></el-input> -->
		      <el-date-picker auto-complete="off"
			      v-model="form.day"
			      type="date"
			      placeholder="选择日期"
			      :picker-options="pickerOptions0">
			    </el-date-picker>
		    </el-form-item>
		    <el-form-item label="放映时间" :label-width="formLabelWidth">
		      <!-- <el-input v-model="form.time" auto-complete="off"></el-input> -->
		        <el-time-select  auto-complete="off"
				  v-model="form.time"
				  :picker-options="{
				    start: '08:30',
				    step: '00:15',
				    end: '18:30'
				  }"
				  placeholder="选择时间">
				</el-time-select>
		    </el-form-item>

		    <el-form-item label="价格" :label-width="formLabelWidth">
		      <el-input v-model="form.price" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addMsg">确 定</el-button>
		  </div>
		</el-dialog>




		<el-table
		ref="table"
	    :data="save"
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
	      prop="g_garde"
	      label="评分"
	      width="180">
	    </el-table-column>
		<el-table-column
	      prop="f_money"
	      label="总票房">
	    </el-table-column>
	    </el-table>
  </div>
</template>

<script>

import route from "../../../router/index.js"
import { Post, Get } from "../../../utils/utils.js"
export default {
  name: 'cinemas',
  data(){
  	return {
  		pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
  		form: {
          time: '',
          price: '',
          day: ""
        },
        formLabelWidth: '120px',
  		save:[],
  		cinemas:{
  			eachpage:10,
			maxpage:0,
			curpage:1,
			rows:[],
			total:0
  		},
  		screens:[],
        cinemasVal: '',
        screensVal:"",
        temporary:[],
        dialogFormVisible:false
  	}
  },
  created(){
  	this.getSave()
  	this.getCinemas({page:1,rows:10})
  },
  methods:{
  	prevent(){
  		route.push("/info/match")
  	},
  	getSave(param = {}){
  		Post("/data/find",param)
  		.then((res)=>{
  			this.save = res.data[0].save
  		})
  	},
  	getCinemas({page,rows}){
  		Post("/cinemas/find",{page,rows})
  		.then((res)=>{
  			this.cinemas = res.data
  		})
  	},
  	change(id){
  		Post("/cinemas/find",{
  			submitType:"findJoin",
  			ref:"screens",
  			_id:id
  		}).then((res)=>{
  			const { screens } = res.data 
  			this.screens = screens
  			this.screensVal = ""
  		})
  	},
  	change1(id){
  		this.screensVal = id
  	},
  	addMsg(){

  		var arr = []	
		this.temporary.forEach((item)=>{
			arr.push({
				filmId : item._id,
			    time : this.form.time,
			    day : this.form.day,
			    price : this.form.price,
			    type : this.screensVal
			})
		})
		Post("/show/add",{submitType:"addMore",data:arr})
		.then((res)=>{
			console.log(res.data)
		})
  		this.dialogFormVisible = false
  	},
  	increment(){
  		
  		if(this.temporary.length>0 && this.screensVal != ""){
  			this.dialogFormVisible = true
  		}else{
  			this.$message({
	          showClose: true,
	          message: '请确认已选中影院,放映厅,电影',
	          type: 'error'
	        });
  		}
  	},
  	select(selection){
  		this.temporary = selection
  	},
  	select_all(selection){
  		this.temporary = selection
  	},
  	tableRowClassName(row, index) {
	    if (index === 1) {
	      return 'info-row';
	    } else if (index === 3) {
	      return 'positive-row';
	    }
	    return '';
	},

  }
}

</script>

<style>

</style>
