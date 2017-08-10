<template>
	<div>
		<el-input placeholder="请输入内容" v-model="input5" class="ipt">
			<el-select v-model="select" slot="prepend" placeholder="请选择" class="ipt2">

				<el-option label="中文名" value="1"></el-option>
				<el-option label="类型" value="2"></el-option>
				<el-option label="电影评分" value="3"></el-option>
				<el-option label="演员" value="4"></el-option>
				<el-option label="区域" value="5"></el-option>

			</el-select>
			<el-button style="background-color:#68F2E9;" slot="append" icon="search" @click="Refer" ></el-button>
		</el-input>
		
			
		<el-button class="btn" type="primary" icon="plus" @click="addFilm">增加数据</el-button>
		<el-button class="btn" type="primary" icon="edit" @click="alterFilm" >修改数据</el-button>
		<el-button class="btn" type="danger" icon="delete" @click="Del">清空数据</el-button>
		
		
		
		<el-table
		ref="mut"
		@select="Row"		
		 height="450"
		:data="page.rows"
	    stripe
	    style="width: 100%">
		</el-table-column>
		<el-table-column
      	type="selection"
      	width="55">
    	</el-table-column>
	    <el-table-column
	      prop="f_chn"
	      label="电影中文名"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="f_eng"
	      label="电影英文名"
	      width="150">
	    </el-table-column>
	    <el-table-column
	      prop="f_type" 
	      label="类型">
	    </el-table-column>
	    <el-table-column
	      prop="f_garde" 
	      label="电影评分"
		 	width="150">
	    </el-table-column>
		 <el-table-column
	      prop="f_perfor"
		  width="300"
	      label="演员">
	    </el-table-column>
		<el-table-column
	      prop="f_look" 
			width="200"
	      label="想看">
	    </el-table-column>
		<el-table-column
	      prop="f_address"
			width="200"
	      label="区域">
	    </el-table-column>
		<el-table-column
	      prop="f_year"
	      label="年代(年份)"
			width="150">
	    </el-table-column>
		<el-table-column
	      prop="f_time"
	      label="时长(分钟)"
		 	width="150">
	    </el-table-column>
		<el-table-column
	      prop="f_reletime"
	      label="上映时间"
			width="150">
	    </el-table-column>
		<el-table-column
	      prop="f_area"
	      label="上映地区"
			width="150">
	    </el-table-column>
	    <el-table-column
		  fixed="right"
		  label="操作"
		  width="100">
	  <template scope="scope">
		<el-button type="primary"  @click.native.prevent="deleteRow(scope.row._id)" size="small">删除</el-button>
      </template>
    </el-table-column>
	</el-table>
		
	<div class="FuncTion">
		<el-pagination
				class="Tablescroll"
		  @size-change="handleSizeChange"
		  @current-change="handleCurrentChange"
		  :current-page="page.curpage"
		  :page-sizes="[5, 10, 20, 20]"
		  :page-size="page.eachpage"
		  layout="total, sizes, prev, pager, next, jumper"
		  :total="page.total">
		</el-pagination>
	</div>
	
	  <el-dialog title="修改电影信息" :visible.sync="dialogForm">
        <el-form :model="from2">
          <el-form-item label="电影中文名" :label-width="formLabelWidth">
            <el-input v-model="from2.f_chn"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" :label-width="formLabelWidth">
            <el-input v-model="from2.f_eng"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影类型" :label-width="formLabelWidth">
            <el-input v-model="from2.f_type" auto-complete="off"></el-input>
          </el-form-item>
			<el-form-item label="电影评分" :label-width="formLabelWidth">
			<el-input  v-model="from2.f_garde"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="电影演员" :label-width="formLabelWidth">
			<el-input  v-model="from2.f_perfor"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="想看" :label-width="formLabelWidth">
			<el-input v-model="from2.f_look"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="区域" :label-width="formLabelWidth">
			<el-input v-model="from2.f_address"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="年代" :label-width="formLabelWidth">
			<el-input v-model="from2.f_year"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="时长" :label-width="formLabelWidth">
			<el-input v-model="from2.f_time"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="上映时间" :label-width="formLabelWidth">
			<el-input v-model="from2.f_reletime"  auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="上映区域" :label-width="formLabelWidth">
			<el-input v-model="from2.f_area"  auto-complete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="详情" :label-width="formLabelWidth">
			<el-input v-model="from2.f_info" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="票房" :label-width="formLabelWidth">
			<el-input v-model="from2.f_info" auto-complete="off"></el-input>
			</el-form-item>
	

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="xiugai">提 交</el-button>
        </div>
      </el-dialog>	
				
				
		 <el-dialog title="增加电影信息" :visible.sync="dialogFormVisible">
        <el-form :model="from">
          <el-form-item label="电影中文名" :label-width="formLabelWidth">
            <el-input v-model="from.f_chn" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" :label-width="formLabelWidth">
            <el-input v-model="from.f_eng" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影类型" :label-width="formLabelWidth">
            <el-input v-model="from.f_type" auto-complete="off"></el-input>
          </el-form-item>
			<el-form-item label="电影评分" :label-width="formLabelWidth">
			<el-input v-model="from.f_garde" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="电影演员" :label-width="formLabelWidth">
			<el-input v-model="from.f_perfor" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="想看" :label-width="formLabelWidth">
			<el-input v-model="from.f_look" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="区域" :label-width="formLabelWidth">
			<el-input v-model="from.f_address" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="年代" :label-width="formLabelWidth">
			<el-input v-model="from.f_year" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="时长" :label-width="formLabelWidth">
			<el-input v-model="from.f_time" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="上映时间" :label-width="formLabelWidth">
			<el-input v-model="from.f_reletime" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="上映区域" :label-width="formLabelWidth">
			<el-input v-model="from.f_area" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="详情" :label-width="formLabelWidth">
			<el-input v-model="from.f_info" auto-complete="off"></el-input>
			</el-form-item>

			<el-form-item label="票房" :label-width="formLabelWidth">
			<el-input v-model="from.f_money" auto-complete="off"></el-input>
			</el-form-item>
        </el-form>

		<el-upload
		  class="upload-demo"
		  action="http://localhost:3000/upload"
		  :on-success = "success"
		  :on-change="handleChange"
		  :file-list="fileList">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	


        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addshuju">提 交</el-button>
        </div>
      </el-dialog>
		  
		<el-dialog
		title="提示"
		:visible.sync="dialog"
		size="tiny"
		>
		<span>你确定清空电影所有数据无法恢复！！</span>
		<span slot="footer" class="dialog-footer">
		<el-button @click="dialog = false">取 消</el-button>
		<el-button type="primary" @click="didel">确 定</el-button>
		</span>
		</el-dialog>
		
		
		<el-button class="imgbtn" @click="Cut" type="success" icon="picture">添加电影图片</el-button>
	</div>
</template>
<script>
			
import {Get, Post} from "../../api/api.js" //ajax 模块引入
import mtur from "../../router/index.js"



	export default{
		data() {
		return {
				from:{
					f_chn:"",
					f_eng:"",
					f_type:"",
					f_garde:"",
					f_perfor:"",
					f_look:"",
					f_address:"",
					f_year:"",
					f_time:"",
					f_reletime:"",
					f_area:"",
					f_info:"",
					f_money:""
				},
				from2:{
					
				},
				dialog:false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				dialogForm: false,
				page: {
					curpage: 1,
					eachpage: 10,
					maxpage: 0,
					total: 0,
					rows:[]
				},
				input5: '',
				select: '',
				optionId:"",
				fileList:[],
				filmPic:[]
			}
		},
		name:'movie',
		//预加载数据
		created(){
			Post('/film/find',{page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
				this.page=res.data
			})
			
		},
		//获取数据（计算）
		computed:{
			
		},
		//调用方法
		methods:{
			success(response, file, fileList){
				if(typeof response !== String){
					console.log(1111)
					this.filmPic = [...this.filmPic,`http://localhost:3000/img/${file.name}`]
				}
			},
			handleChange(file, fileList) {
		        this.fileList = fileList.slice(-3);
		    },
			//删除功能
			deleteRow(id){
				Post('/film/del',{_id:id,page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
					this.page=res.data
				})
			},
			//翻页功能
			handleSizeChange(val) {
				Post('/film/find',{page: this.page.curpage,rows: val}).then((res)=>{
					this.page=res.data
				})
			},
			handleCurrentChange(val) {
				Post('/film/find',{rows:  this.page.eachpage,page: val}).then((res)=>{
					this.page=res.data
				})
			},
			//全部清空功能
			Del(){
				this.dialog = true
			},
			didel(){
				this.dialog = false
				Post('/film/del',{}).then((res)=>{
					this.page=res.data
				})
			},
			//查询方法
			Refer(){
				var a = this.input5
				switch(this.select){
					case "1":
					Post('/film/find',{index:a,page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
					  this.page=res.data
					});
					break;
				}
			},
			//增加数据
			addFilm(){
				this.dialogFormVisible = true
			},
			//修改信息
			alterFilm(){
				this.dialogForm = true
			},
			//添加数据
			addshuju(){
				var b =Object.assign(this.from,{img:this.filmPic})
				this.dialogFormVisible = false
				Post('/film/add',b).then((res)=>{
					  this.page=res.data
					});
			},
			//单元格事件
			Row(row){
				if(row.length === 1){
					this.from2=row[0]
					this.optionId = row[0]._id
				}else{
					this.optionId = ""
				}
			},
			//修改事件提交
			xiugai(e){
				this.dialogForm = false
				let a={
					_id:this.optionId,
					f_chn:this.from2.f_chn,
					f_eng:this.from2.f_eng,
					f_type:this.from2.f_type,
					f_garde:this.from2.f_garde,
					f_perfor:this.from2.f_perfor,
					f_look:this.from2.f_look,
					f_address:this.from2.f_address,
					f_year:this.from2.f_year,
					f_time:this.from2.f_time,
					f_reletime:this.from2.f_reletime,
					f_area:this.from2.f_area,
					f_money:this.from2.f_money,
					f_info:this.from2.f_info
				}
				Post('/film/update',a).then((res)=>{
					  this.page=res.data
					});
			},
			//跳转
			Cut(){
				// mtur.push('/info/movieimg')
			}
    	}		
}
	
</script>
<style>
	.FuncTion{
		display:flex;
		margin-top:20px;
	}
	.ipt{
		width:400px;
		margin-right: 220px;
	}
	.ipt2{
		width: 100px;
	}
    .btn{
		margin-left: 10px;
	}
	.imgbtn{
		width: 500px;
		height: 60px;
		margin-top: 30px;
		margin-left: 300px;
		font-size: 22px;
	}
.Tablescroll{
	font-size: 16px;
	color: #ABC4F4;
}

</style>