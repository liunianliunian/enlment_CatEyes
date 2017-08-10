<template>
	<div class="boxder">
	<div class="boxder_1">
	<el-upload
	class="upload-demo"
	action="http://localhost:3000/upload"
	:on-preview="handlePreview"
	:on-remove="handleRemove"
	:on-success="handsuccess"
	:file-list="fileList2"
	list-type="picture">
	<el-button size="small" type="primary" @click="mx">点击上传</el-button>
	<el-button size="small" type="primary" @click="fanhui">返回电影管理</el-button>
	<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
	</el-upload>
	</div>
	</div>
</template>
<script>
import mut2 from "../../router/index.js"
  export default {
    data() {
      return {
        fileList2: []
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
	handsuccess(response, file, fileList){
		console.log(response,fileList);
	
		console.log(fileList[0].name);
	},
	mx(name){
		console.log(name)
		},
	fanhui(){
		mut2.push('/info/flim')
	}
    }
  }
</script>
<style>
	.boxder{
		width: 900px;
		min-height: 500px;
		border: 5px solid #94C9EF;
		margin-left: 50px;
	}
  .el-upload__tip{
		  color:#631177;
		  font-size: 20px;
		  background:#F6F5F8;
	  }
.el-upload__tip{
	margin-top: 30px;
}
.boxder_1{
	padding: 30px;
}
</style>