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
		<el-button class="btn" type="success" icon="plus" @click="addComments">添加评论信息</el-button>
		
		
		
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
	      prop="f_garde" 
	      label="电影评分"
		 	width="150">
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

<!-- 修改电影信息 -->
	  <el-dialog title="修改电影信息" :visible.sync="dialogForm">
        <el-form :model="from2">
		<el-form-item label="获取评分" :label-width="formLabelWidth">
			<el-button type="success" @click="getGardeData">获取数据</el-button>
			<span>观众评分:{{from2.f_garde}}</span>
			<span>点评次数:{{from2.f_count}}</span>
		</el-form-item>
          <el-form-item label="电影中文名" :label-width="formLabelWidth">
            <el-input v-model="from2.f_chn"  auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" :label-width="formLabelWidth">
            <el-input v-model="from2.f_eng"  auto-complete="off"></el-input>
            
          </el-form-item>

		    <el-form-item label="电影英文名" :label-width="formLabelWidth">
			<el-input v-model="from2.f_type" auto-complete="off" placeholder="类型之间使用逗号(,)分割"></el-input>
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
            
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogForm = false">取 消</el-button>
          <el-button type="primary" @click="xiugai">提 交</el-button>
        </div>
      </el-dialog>	
				
<!-- 增加电影信息 -->
	 <el-dialog title="增加电影信息" :visible.sync="dialogFormVisible">
        <el-form :model="from">
			<el-form-item label="封面图片" :label-width="formLabelWidth">
				<el-upload
				  class="upload-demo"
				  action="http://localhost:3000/upload"
				  :on-success = "success"
				  :on-change="handleChange"
				  :file-list="fileList">
				  <el-button size="small" type="primary">上传封面图片</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>

			<el-form-item label="详情" :label-width="formLabelWidth">
				<el-input
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容"
				  v-model="from.f_info">
				</el-input>
			</el-form-item>	

		  <el-form-item  :label-width="formLabelWidth">
			<el-collapse accordion>
			    <el-collapse-item title="添加基本信息">
			      <span>电影中文名</span>  
			      <el-input v-model="from.f_chn" auto-complete="off"></el-input>
			      <span>电影英文名</span>
			      <el-input v-model="from.f_eng" auto-complete="off"></el-input>
			      <span>电影类型</span>
			      <el-input v-model="from.f_type" auto-complete="off" placeholder="类型之间使用逗号(,)分割"></el-input>
			      <span>制片国家/地区</span>
			      <el-input v-model="from.f_address" auto-complete="off"></el-input>
			      <span>年代</span>
			      <el-input v-model="from.f_year" auto-complete="off"></el-input>
				</el-collapse-item>
		    </el-collapse>  
		  </el-form-item>

		  <el-form-item :label-width="formLabelWidth">
			<el-collapse accordion>
				<el-collapse-item title="添加上映信息">
				  <span>上映时间</span>
				  <el-input v-model="from.f_reletime" auto-complete="off"></el-input>
				  <span>上映地点</span>
				  <el-input v-model="from.f_area" auto-complete="off"></el-input>
				  <span>分钟数</span>
			      <el-input v-model="from.f_time" auto-complete="off"></el-input>
			      <span>想看</span>
			      <el-input v-model="from.f_look" auto-complete="off"></el-input>
				</el-collapse-item>
			</el-collapse>  
		  </el-form-item>

			<el-form-item  :label-width="formLabelWidth">
			    <el-collapse accordion>
				  <el-collapse-item title="添加导演信息">
				    <span>导演中文名</span>
				    <el-input v-model="from.f_director.name"></el-input>
				    <span>导演英文名</span>
				    <el-input v-model="from.f_director.eng"></el-input>
				    <el-upload
					  class="upload-demo"
					  action="http://localhost:3000/upload"
					  :on-success = "success1"
					  :on-change="handleChange"
					  :file-list="fileList1">
					  <el-button size="small" type="primary">上传导演头像</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				  </el-collapse-item>
			    </el-collapse>
			</el-form-item>

			<el-form-item  :label-width="formLabelWidth">
				<el-collapse accordion>
				  <el-collapse-item title="添加演员信息">
				    <el-button type="success" @click="saveDirector">点击保存</el-button><br/>
				    <span>演员中文名</span>
				    <el-input v-model="d_name"></el-input>
				    <span>演员英文名</span>
				    <el-input v-model="d_eng"></el-input>
				    <span>饰演角色</span>
				    <el-input v-model="d_role"></el-input>
				    <el-upload
					  class="upload-demo"
					  action="http://localhost:3000/upload"
					  :on-success = "success2"
					  :on-change="handleChange"
					  :file-list="fileList1">
					  <el-button size="small" type="primary">上传导演头像</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				  </el-collapse-item>
			    </el-collapse>
			</el-form-item>

			<el-form-item  :label-width="formLabelWidth">
				<el-collapse accordion>
				  <el-collapse-item title="添加票房信息">
				    <span>排名</span>
				    <el-input v-model="from.f_money.ranking"></el-input>
				    <span>首周票房</span>
				    <el-input v-model="from.f_money.firstweek"></el-input>
				    <span>总票房</span>
				    <el-input v-model="from.f_money.all"></el-input>
				  </el-collapse-item>
			    </el-collapse>
			</el-form-item>

			<el-form-item label="剧照" :label-width="formLabelWidth">
				<el-upload
				  class="upload-demo"
				  action="http://localhost:3000/upload"
				  :on-success = "success3"
				  :on-change="handleChange"
				  :file-list="fileList3">
				  <el-button size="small" type="primary">上传剧照图片</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>		
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addshuju">提 交</el-button>
        </div>
      </el-dialog>
		  
<!-- 添加评论信息 -->
       	<el-dialog title="添加评论信息" :visible.sync="dialog">
			<el-collapse accordion>
			  <el-collapse-item title="添加评论信息">
			    <span>用户名</span>
			    <el-input v-model="comments.name"></el-input>
			    <span>评分</span>
			    <el-input v-model="comments.garde"></el-input>
			    <span>评论的内容</span>
			    <el-input v-model="comments.info"></el-input>
			    <span>点赞数</span>
			    <el-input v-model="comments.praise"></el-input>
			    <el-upload
				  class="upload-demo"
				  action="http://localhost:3000/upload"
				  :on-success = "success4"
				  :on-change="handleChange"
				  :file-list="fileList4">
				  <el-button size="small" type="primary">上传用户头像</el-button>
				  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			  </el-collapse-item>
		    </el-collapse>	

			<div slot="footer" class="dialog-footer">
	          <el-button @click="dialog = false">取 消</el-button>
	          <el-button type="primary" @click="submit">提 交</el-button>
	        </div>
		</el-dialog>
	</div>
</template>
<script>
			
import {Get, Post } from "../../api/api.js" //ajax 模块引入
import { getTime } from "../../utils/utils.js"
import mtur from "../../router/index.js"

	export default{
		data() {
		return {
				d_name:"",
				d_eng : "",
				d_role : "",
				d_img : "",
				from:{
					images:"",
					f_chn:"",
					f_eng:"",
					f_type:"",
					f_garde:"",
					f_count:"",
					f_look:"",
					f_address:"",
					f_year:"",
					f_time:"",
					f_reletime:"",
					f_area:"",
					f_info:"",
					f_perfor:[],
					stillpic:[],
					f_director: 
						{name :"",
						 role :"导演",
						 eng : "",
						 img : ""
						},
					f_money : 
					    {
					    ranking : "",
					    firstweek : "",
					    all : ""	
					    }
				},
				from2:{
					
				},
				comments:{
					garde : "",
					name : "",
					img : "",
					info : "",
					praise : "",
					time : ""
				},
				dialog:false,
				dialogFormVisible: false,
				dialogFormVisible1:false,
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
				fileList1: [],
				fileList2:[],
				fileList3:[],
				fileList4:[],
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
		//调用方法
		methods:{
			//录入演员信息
			saveDirector(){
				if(this.d_name != "" && this.d_eng != "" && this.d_role != "" && this.d_img != ""){
					this.from.f_perfor = [...this.from.f_perfor,{
						name : this.d_name,
						role : this.d_eng,
						eng : this.d_role,
						img : this.d_img
					}]
					this.d_name = "";
					this.d_eng = "";
					this.d_role = "";
					this.d_img = "";
					this.fileList2 = [];
				}
			},
			//封面图片
			success(response, file, fileList){
				if(typeof response !== String){
					this.from.images = `http://localhost:3000/img/${file.name}`
				}
			},
			//导演图片
			success1(response, file, fileList){
				if(typeof response !== String){
					this.from.f_director.img = `http://localhost:3000/img/${file.name}`
				}
			},
			//演员图片
			success2(response, file, fileList){
				if(typeof response !== String){
					this.d_img = `http://localhost:3000/img/${file.name}`
				}
			},
			success3(response, file, fileList){
				if(typeof response !== String){
					this.from.stillpic = [...this.from.stillpic,`http://localhost:3000/img/${file.name}`]
				}
			},
			success4(response, file, fileList){
				if(typeof response !== String){
					this.comments.img = [...this.comments.img,`http://localhost:3000/img/${file.name}`]
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
				Post('/film/find',{rows: this.page.eachpage,page: val}).then((res)=>{
					this.page=res.data
				})
			},
			//添加
			addComments(){
				this.dialog = true
			},
			submit(){
				if(this.optionId != ""){
					this.comments.time = getTime()
					Post("/comments/add",
						{
							ref:"film",
							refId : this.optionId,
							refData :this.comments
						})
					.then((res)=>{
						console.log(res.data)
					})
					Post("/comments/add",{
						ref:"film",
						refId:{_id:"598c83a4d9e0c10f1cb5dd1f"},
						refData:this.comments
					}).then((res)=>{
						console.log(res.data)
					})
					this.dialog = false
				}
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
				if(this.from.f_type != ""){
					this.from.f_type = this.from.f_type.split(",")					
				}
				this.dialogFormVisible = false
				Post('/film/add',this.from).then((res)=>{
					  this.page=res.data
					});
			},
			//获取评分等信息
			getGardeData(){
				if(this.optionId != ""){
					Post("/film/find",{
						ref:"comments",
						submitType:"findJoin",
						_id:this.optionId
					}).then((res)=>{
						const {comments} = res.data
						if(comments.length>0){
							var num = 0 ;
							comments.forEach((item)=>{
								num += Number(item.garde)
							})
							this.from2.f_count = comments.length 
							num = JSON.stringify(num/this.from2.f_count)
							this.from2.f_garde = num.substring(0,num.indexOf(".")+2);
						}					
					})
				}
			},
			//单元格事件
			Row(row){
				if(row.length === 1){
					this.from2=row[0]
					this.from2.f_type = this.from2.f_type.join(",")
					this.optionId = row[0]._id
				}else{
					this.optionId = ""
				}
			},

			//修改事件提交
			xiugai(e){
				this.dialogForm = false
				this.from2.f_type = this.from2.f_type.split(",")	
				let a={
					_id:this.optionId,
					f_type: this.from2.f_type,
					f_garde : this.from2.f_garde,
					f_count : this.from2.f_count,
					f_chn:this.from2.f_chn,
					f_eng:this.from2.f_eng,
					f_look:this.from2.f_look,
					f_address:this.from2.f_address,
					f_year:this.from2.f_year,
					f_time:this.from2.f_time,
					f_reletime:this.from2.f_reletime,
					f_area:this.from2.f_area,
					f_info:this.from2.f_info
				}
				Post('/film/update',a).then((res)=>{
					  this.page=res.data
					});
			},
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