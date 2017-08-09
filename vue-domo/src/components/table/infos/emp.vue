			
<template>	
	<div class='box'>
	 <el-table
    :data="page.rows"
    style="width: 100%"
    >
    <el-table-column
      prop="coug"
      label="员工编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="员工姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      label="员工年龄">
    </el-table-column>
    <el-table-column
      prop="sroce"
      label="员工分数">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=1
      :page-sizes="[5, 10, 15, 20]"
      :page-size="page.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
	
		<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
	</div>

</template>

<script>
import {mapState,mapActions} from 'vuex'
import {GET_BYEMLEMENT,DEL_PP} from './store.js'
	export default {
		name:'emp',
		data() {
      return {
	        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
	      };
	    },
		created(){
				this[GET_BYEMLEMENT]()
		},
		computed:{
			...mapState('emp',['page'])
		},
		methods:{
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleClick(index, row) {
      		var id=row._id
	   			this[DEL_PP]({id});
          this[GET_BYEMLEMENT]();	
	      },
		  handleSizeChange(val) {
        	this[GET_BYEMLEMENT]({
					page:this.page.curpage,rows:val
				})
      },
  		handleCurrentChange(val) {
		        this[GET_BYEMLEMENT]({
						page:val,rows:this.page.eachpage
				})
      },
			...mapActions('emp',[GET_BYEMLEMENT,DEL_PP]),
	}
}

</script>

<style>
table {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	border-collapse: collapse;
	width:500px;
}
table caption{
	font-weight: 700;
	font-size: 24px;
}
</style>