<template>
<div class="basetable">
  <div class="tableMain">
  <el-button type="primary" @click="addAdmin" style="margin-left: 10px" >新增管理员</el-button>
    <el-table 
    :data="page.rows" 
    style="width: 100%"
    highlight-current-row>
      <el-table-column prop="acc" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="pwd" label="密码" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
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
  </div>
  <el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="账号" :label-width="formLabelWidth">
        <el-input v-model="form.acc" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.pwd" auto-complete="off"></el-input>
        </el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeAdmin">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import api from "../../api/index.js"

export default {
  data() {
    return {
      page: {
		curpage: 1,
		eachpage: 5,
		maxpage: 0,
		rows: [],
		count: 0,
      },
	  id: "",
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
    }
  },
  created() {
	api.getUser('/admin/find', {page:this.page.curpage, rows:this.page.eachpage}).then((res) => {   		
		this.page = res.data
		// console.log(this.page)
	})
  },
  methods: {
    handleEdit(row) {
    	console.log(row)
      this.id = row._id
	  this.form = row
      console.log(this.form);
      this.dialogFormVisible = true
    },
    changeAdmin() {
    	var dota = {
	    		page:this.page.curpage, 
	    		rows:this.page.eachpage,
	    		_id: this.id,
	    		acc:this.form.acc,
	    		pwd:this.form.pwd,
	    	}
		api.getUser('/admin/update',dota).then((res) => {   		
			api.getUser('/admin/find', {page:this.page.curpage, rows:this.page.eachpage}).then((res) => {   		
				this.page = res.data
			})
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
        api.getUser('/admin/del', {_id:pp,}).then((res) => {   		
			api.getUser('/admin/find', {page:this.page.curpage, rows:this.page.eachpage}).then((res) => {   		
				this.page = res.data
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
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addAdmin() {

    },
  }
}
</script>
<style>
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