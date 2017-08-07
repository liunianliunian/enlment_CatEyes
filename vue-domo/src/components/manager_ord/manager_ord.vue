<template>
<div class="basetable">
  <div class="tableMain">
  	<h1 style="color: #FBFF00">电影资讯</h1>
	<div>
	  <el-input placeholder="请输入内容" v-model="input5" style="width:500px">
	    <el-select v-model="select" slot="prepend" placeholder="请选择" >
	      <el-option label="电影名" value="1"></el-option>
	      <el-option label="演员" value="2"></el-option>
	      <el-option label="上映日期" value="3"></el-option>
	    </el-select>
	    <el-button @click="search" slot="append" icon="search"></el-button>
	  </el-input>
	<el-button type="primary" @click="addFilm" style="margin-left: 10px" >新增电影</el-button>
	<el-button type="primary" @click="del(multipleSelection)" style="margin-left: 10px" >批量删除</el-button>
	</div>
    <el-table
    ref="multipleTable"
    :data="page.rows"
    border
    style="width: 100%; height=100%"
    highlight-current-row
    @row-click="toggleRowSelection"
    @selection-change="handleSelectionChange">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="f_chn"
      label="电影中文名"
      width="150"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_eng"
      label="电影英文名"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_type"
      label="电影类型"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_garde"
      label="电影评分"
      width="200"
      height="80">
    </el-table-column>
<!--     <el-table-column
      prop="f_perfor"
      label="演员"
      width="300">
    </el-table-column> -->
    <el-table-column
      prop="f_look"
      label="想看数"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_address"
      label="区域"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_year"
      label="年代（年份）"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_time"
      label="时长（分钟）"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_reletime"
      label="上映时间"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_area"
      label="上映地区"
      width="200"
      height="80">
    </el-table-column>
    <el-table-column
      prop="f_money"
      label="票房"
      width="200"
      height="80">
    </el-table-column>
 <!--    <el-table-column
      prop="f_info"
      label="剧情简介"
      width="400"
      height="80">
    </el-table-column> -->
  <!--   <el-table-column
      prop="f_firstpic"
      label="首页图片"
      width="200">
    </el-table-column>
    <el-table-column
      prop="f_pic"
      label="图片"
      width="200">
    </el-table-column> -->
      <el-table-column label="操作" width="150">
        <template scope="scope" >
       <el-button
         size="small"
         @click="handleEdit(scope.row)">编辑</el-button>
       <el-button
         size="small"
         type="danger"
         @click="handleDelete(scope.row)">删除</el-button>
     </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-pagination
	  :data="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
  <el-dialog title="资讯信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="电影中文名" :label-width="formLabelWidth">
        <el-input v-model="form.f_chn" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影英文名" :label-width="formLabelWidth">
        <el-input v-model="form.f_eng" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影类型" :label-width="formLabelWidth">
        <el-input v-model="form.f_type" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影评分" :label-width="formLabelWidth">
        <el-input v-model="form.f_garde" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="演员" :label-width="formLabelWidth">
        <el-input v-model="form.f_perfor" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="想看数" :label-width="formLabelWidth">
        <el-input v-model="form.f_look" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="区域" :label-width="formLabelWidth">
        <el-input v-model="form.f_address" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年代(年份)" :label-width="formLabelWidth">
        <el-input v-model="form.f_year" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="时长(分钟)" :label-width="formLabelWidth">
        <el-input v-model="form.f_time" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上映时间" :label-width="formLabelWidth">
        <el-input v-model="form.f_reletime" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上映地点" :label-width="formLabelWidth">
        <el-input v-model="form.f_area" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="票房" :label-width="formLabelWidth">
        <el-input v-model="form.f_money" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="剧情简介" :label-width="formLabelWidth">
        <el-input v-model="form.f_info" auto-complete="off"></el-input>
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeInfo">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import api from "../../api/index.js"
import Router from "../../router/index.js"

	export default {
		name:'inTheaters',
	  data() {
	    return {
	    	page: {
  				curpage: 1,
  				eachpage: 5,
  				maxpage: 0,
  				rows: [],
  				count: 0
  			},
		    input5: '',
		    select: '',
		    id: '',
	      dialogFormVisible: false,
	      formLabelWidth: '80px',
	      form: {}
	    }
	  },
	  created() {
    		api.getUser('/filmmessage/find', {page:this.page.curpage, rows:this.page.eachpage}).then((res) => {   		
    			this.page = res.data
    			// console.log(this.page)
    		})
    	},
	  methods: {
	    handleEdit(row) {
	        this.id = row._id
			this.form = row
	    	console.log(row)
	      this.dialogFormVisible = true
	    },
	    changeInfo() {
	    	var dota = {
	    		page:this.page.curpage, 
	    		rows:this.page.eachpage,
	    		_id: this.id,
	    		f_chn:this.form.f_chn,
	    		f_eng:this.form.f_eng,

	    	}
	    	api.getUser('/filmmessage/update', dota).then((res) => {   		
			this.page = res.data
			console.log(this.page)

		})
	    	this.dialogFormVisible = false
	    },
	    handleDelete(row) {

	      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        var pp = row._id
	        api.getUser('/filmmessage/del', {_id:pp, page:this.page.curpage, rows:this.page.eachpage}).then((res) => {   		
    			this.page = res.data
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
        // console.log(`每页 ${val} 条`);
        api.getUser('/filmmessage/find', {page:this.page.curpage, rows:val}).then((res) => {   		
			this.page = res.data
			this.page.eachpage = val
			// console.log(this.page)

		})
      },
	    handleCurrentChange(val) {
	      // console.log(`当前页: ${val}`);
	      api.getUser('/filmmessage/find', {page:val, rows:this.page.eachpage}).then((res) => { 
			this.page = res.data
			this.page.curpage = val
			// console.log(this.page)
		})
	    },
	    //按条件模糊搜索
	    search(row) {
      	var inputVal = this.input5
      	var select = this.select
      	console.log(select)
      	switch(select) {
      		case "1":
	      		api.getUser('/filmmessage/find', {f_chn:inputVal, page:this.page.curpage, rows:this.page.eachpage}).then((res) => { 
	      		// console.log(res.data)	
				this.page = res.data
				console.log(this.page)
				});
			break;
			case "2":
				api.getUser('/filmmessage/find', {f_perfor:inputVal, page:this.page.curpage, rows:this.page.eachpage}).then((res) => { 
	      		// console.log(res.data)	
				this.page = res.data
				console.log(this.page)
				});
			break;
			case "3":
				api.getUser('/filmmessage/find', {f_reletime:inputVal, page:this.page.curpage, rows:this.page.eachpage}).then((res) => { 
	      		// console.log(inputVal)  	
				this.page = res.data
	      		console.log(this.page)	
				});
				break;
      	}
      },
      //新增电影
  		addFilm() {
  		Router.push('/info/addFilm')
	  },
	  //批量删除
	  del(multipleSelection) {
    	var ids = []
    	for(var key of this.multipleSelection) {
    		ids.push(key._id)
    	}
    	api.getUser('/filmmessage/del', {ids:ids}).then((res) => {	
			this.page = res.data
		})
	  },
	    //获取多项数据的id
	  handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
	  //复选框
	  toggleRowSelection(val) {
	  	this.$refs.multipleTable.toggleRowSelection(val)
	  }
	}
}
</script>

<style>
	.el-select {
		width: 110px;
	}
	.basetable {
	    .selectMenu {}
	    .tableMain {
	        margin: {
	            top: 10px;
	        };
	    }
	    .page {
	        float: right;
	        margin: {
	            top: 10px;
	        };
	    }
	}

</style>
