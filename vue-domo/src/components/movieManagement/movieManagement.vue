<template>
	<div class='box'>
	<div >
	  <el-input placeholder="请输入内容" v-model="getMessOne" style="width:400px">
	    <el-select v-model="select" slot="prepend" placeholder="请选择" style='width:100px'>
	      <el-option label="院线名" value="1"></el-option>
	    </el-select>
	    <el-button slot="append" icon="search" @click='getMessThree'style='background-color:#7EEAFB'></el-button>
	  </el-input>
	   <el-button style='background-color: #DFFE48' @click='getMessTwo'>新增影院</el-button>
	</div>
	 <el-table  highlight-current-row
    :data="page.rows"
    style="width: 100%"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="电影院线"
      width="180">
    </el-table-column>
    <el-table-column
      prop="adress"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tel"
      label="电话">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="250">
      <template scope="scope" >
        <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="changeDada(scope.$index, scope.row)" type="text" size="small">修改</el-button>
    
          <el-button @click="changeClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
      </template>
		
    </el-table-column>
  </el-table>
  <el-dialog title="修改院线信息" :visible.sync="dialogFormVisible" >
  <el-form :model="form" style='width:400px'>
    <el-form-item label="院线名" :label-width="formLabelWidth" >
      <el-input v-model="form.name" auto-complete="off" :placeholder='name'></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth">
       <el-input v-model="form.adress" auto-complete="off" :placeholder='adress' ></el-input>
    </el-form-item>
     <el-form-item label="电话" :label-width="formLabelWidth">
       <el-input v-model="form.tel" auto-complete="off" :placeholder='tel'></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="changedataClick">确 定</el-button>
  </div>
</el-dialog>

 <el-dialog title="增加放映厅" :visible.sync="lookFilmHome" >
 <el-form  style='width:300px'>
    <el-form-item label="放映厅" :label-width="formLabelWidth" >
      <el-input v-model="look" auto-complete="off" :placeholder='lookint'></el-input>
    </el-form-item>
     <el-form-item label="座位" :label-width="formLabelWidth" >
      <el-input v-model="seat" auto-complete="off" :placeholder='lookseat'></el-input>
    </el-form-item>
</el-form >

<div slot="footer" class="dialog-footer">
    <el-button @click="lookFilmHome = false">取 消</el-button>
    <el-button type="primary" @click="lookClick">添 加</el-button>
  </div>
 </el-dialog>






 <el-dialog :title=LookSeat.name :visible.sync="lookSeat" >
 <el-table  highlight-current-row
    :data="LookSeat.screens"
    style="width: 100%"
    >
    <el-table-column
      prop="player"
      label="放映厅"
      width="180">
    </el-table-column>
    <el-table-column
      prop="seat"
      label="座位"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
     <template scope="scope" >
        <el-button @click="lookC(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        <el-button @click="lookS(scope.$index, scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="lookW(scope.$index, scope.row)" type="text" size="small">预览</el-button>
      </template>
      </el-table-column>
</el-table>
	<div>
		<el-button @click="lookHome" type="text" size="small">添加放映厅</el-button>
	</div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="lookSeat = false">取 消</el-button>
    <el-button type="primary" @click="lookSeat=false">确 定</el-button>
  </div>
 </el-dialog>


<el-dialog title="修改放映厅" :visible.sync="changeSeat" >
 <el-form  style='width:300px'>
    <el-form-item label="放映厅" :label-width="formLabelWidth" >
      <el-input v-model="lookSSS" auto-complete="off" :placeholder='lookP'></el-input>
    </el-form-item>
     <el-form-item label="座位" :label-width="formLabelWidth" >
      <el-input v-model="seatWWW" auto-complete="off" :placeholder='lookO'></el-input>
    </el-form-item>
</el-form >
<div slot="footer" class="dialog-footer">
    <el-button @click="changeSeat = false">取 消</el-button>
    <el-button type="primary" @click="lookB">修改</el-button>
  </div>
 </el-dialog>

<el-dialog title="预览座位" :visible.sync="lookSeatline" >
	<table border=1 style='border-collapse: collapse'>
		
	</table>
<div slot="footer" class="dialog-footer">
    <el-button @click="lookSeatline = false">取 消</el-button>
    <el-button type="primary" @click="lookSeatline=false">修改</el-button>
  </div>
 </el-dialog>



  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=1
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total" style='background-color:#EFF2F7'>
    </el-pagination>

   </div>
	
</template>
<script >
import {Post} from '../../api/api.js'
import Route from '../../router/index.js'
	export default{
		name:'movieManagement',
		data() {
		    return {
       		  dialogFormVisible: false,
       		  lookFilmHome:false,
       		  lookSeat:false,
       		  changeSeat:false,
       		  lookSeatline:false,
		      getMessOne: '',
		      select: '',
		      form: {
		          name: '',
		          adress: '',
		          tel:''
		          
		        },
	          formLabelWidth: '100px',

	          //座位：
	          LookSeat:{},
	          // 添加影院
	          name:'',
	          adress:'',
	          tel:'',
	          id:'',

	          //添加座位影厅
	          look:'',
	          lookint:'',
	          lookseat:'',
	          seat:'',
	          lookid:'',
	          looktype:'',

	          //修改影厅
	          lookSSS:'',
	          seatWWW:'',
	          lookP:'',
	          lookO:'',
	          idlook:'',

	          rowId:'',
		      page:{
				eachpage:10,
				maxpage:0,
				curpage:1,
				rows:[],
				total:0
			}
		    }
		  },
		created(){
			Post('/cinemas/find',{page:this.page.curpage,rows:this.page.eachpage})
			.then((res)=>{
				this.page=res.data
			})
		},
		computed:{
			
		},

		 methods: {
		      handleClick(index, row) {
		      	var id=row._id;
		      	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
		        	 Post('/cinemas/del',{_id:id}).then((res)=>{
		        	 	Post('/cinemas/find',{page:this.page.curpage,rows:this.page.eachpage})
						.then((res)=>{
							this.page=res.data
						})
		        	 })
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
		      		
		      },
		 	  handleSizeChange(val) {
		 	  	
		    	Post('/cinemas/find',{page:this.page.curpage,rows:val})
				.then((res)=>{
				this.page=res.data
				this.page.eachpage=val
				})
				
			  },
			  handleCurrentChange(val) {
			  	
		        Post('/cinemas/find',{page:val,rows:this.page.eachpage})
				.then((res)=>{
					this.page=res.data
					this.page.curpage=val
				})
				
		      },
		      //查看放映厅
		      changeClick(index,row){
		      	// console.log(row._id)
		      	this.rowId=row._id;
		      
		      	Post('/cinemas/find',{submitType:"findJoin",ref:"screens",_id:this.rowId}).then((res)=>{
		      			if(res.data.screens.length>0){
		      					this.LookSeat=res.data
		      			}	
		      	})
		      	this.lookSeat=true;
		      	// Route.push('/info/look')
		      },
		      //跳转页面
		      getMessTwo(){
		      	Route.push('/info/ceshi')
		      },
		      //删除座位
		      lookC(a,b){
		      		Post('/screens/del',{_id:b._id}).then((res)=>{

		      				Post('/cinemas/find',{submitType:"findJoin",ref:"screens",_id:b.type})
		      				.then((res)=>{
					      		
					      			this.LookSeat=res.data
					      	})
		      		})

		      },
		      lookS(a,b){
		      		this.lookP=b.player;
		      		this.lookO=b.seat;
		      		this.idlook=b._id;
		      		this.looktype=b.type;
		      		this.changeSeat=true;

		      },
		      lookW(a,b){
		      		console.log(a+'===='+b)
		      		
		      		this.lookSeatline=true;
		      },
		      lookB(){

		      	if(this.lookSSS && this.seatWWW){
			      	Post('/screens/update',{_id:this.idlook,player:this.lookSSS,seat:this.seatWWW})
			      	.then((res)=>{

			      				Post('/cinemas/find',{submitType:"findJoin",ref:"screens",_id:this.looktype})
			      				.then((res)=>{
						      		
						      			this.LookSeat=res.data
						      	})
						      	this.changeSeat=false;
			      		})
		      }
		      		
		      },
		      //修改影院
		      changeDada(a,b){
		      	this.id=b._id
		      	this.name=b.name
		      	this.adress=b.adress
		      	this.tel=b.tel
		      	
		      	this.dialogFormVisible=true;
		      },
		      changedataClick(){
		      	if(this.form.name && this.form.adress){
		      		Post('/cinemas/update',{_id:this.id,name:this.form.name,adress:this.form.adress,tel:this.form.tel}).then((res)=>{
		      		this.page=res.data
		      	})
		      	}
		      	
		      	this.dialogFormVisible=false;
		      },
		      //模糊查询
		      getMessThree(){
		      		
	      			switch(this.select){
		      		case '1':
		      		Post('/cinemas/find',{acc:this.getMessOne,page:this.page.curpage,rows:this.page.eachpage})
		      		.then((res)=>{
		      			this.page=res.data
		      		})
		      		break;
		      	}
		      },
		      lookHome(){
		      	this.lookFilmHome=true;
		      },
		      lookClick(){
		      	console.log(this.seat)
		      	if(this.look && this.seat){
		      		
		      		Post('/screens/add',{ref:'cinemas',refId:{_id:this.rowId},refData:{player:this.look,seat:JSON.parse(this.seat)}})
		      		.then((res)=>{
		      			Post('/cinemas/find',{submitType:"findJoin",ref:"screens",_id:this.rowId})
			      				.then((res)=>{
						      		
						      			this.LookSeat=res.data
						      	})

		      			 this.$message('添加成功');
		      			 this.lookFilmHome=false;
		      		})
		      	}
		      }

		     
		}
   
	}




</script>
<style>
	
</style>