<template>
	<div style="margin-left: 50px">
		<h1 style="color:#ff5500">新增电影信息</h1>
		<div style="margin-left: 20px;"></div>
		<el-form :label-position="labelPosition" label-width="100px" :model="form">
		  <el-form-item label="电影中文名">
		    <el-input v-model="form.f_chn" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="电影英文名">
		    <el-input v-model="form.f_eng" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="电影类型">
		    <el-input v-model="form.f_type" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="电影评分">
		    <el-input v-model="form.f_garde" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="演员">
		    <el-input v-model="form.f_perfor" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="想看">
		    <el-input v-model="form.f_look" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="区域">
		    <el-input v-model="form.f_address" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="年代(年份)">
		    <el-input v-model="form.f_year" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="时长(分钟)">
		    <el-input v-model="form.f_time" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="上映时间">
		    <el-input v-model="form.f_reletime" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="上映地区">
		    <el-input v-model="form._area" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="票房">
		    <el-input v-model="form.f_money" style="width:350px"></el-input>
		  </el-form-item>
		   <el-form-item label="剧情简介">
		    <el-input v-model="form.f_info" style="width:350px"></el-input>
		  </el-form-item>
<!-- 		   <el-form-item label="首页图片">
		    <el-input v-model="form.f_firstpic" style="width:350px"></el-input>

		  </el-form-item>
		   <el-form-item label="图片">
		    <el-input v-model="form.f_pic" style="width:350px"></el-input>
		  </el-form-item> -->

<!-- 上传图片 -->
			<el-upload
			  class="upload-demo"
			  ref="upload"
			  action="http://localhost:3000/upload"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :auto-upload="false">
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>

			<el-button type="primary" @click="sub" style="margin-left: 100px" >提交</el-button>
			<el-button type="primary" @click="back" style="margin-left: 20px" >返回</el-button>
		</el-form>

	</div>

</template>

<script>
import api from "../../api/index.js"
import Router from "../../router/index.js"
  export default {
    data() {
      return {

        labelPosition: 'top',
        form: {
          f_chn: '',
          f_eng: '',
          f_type: '',
          f_garde: '',
          f_perfor: '',
          f_look: '',
          f_address: '',
          f_year: '',
          f_time: '',
          f_reletime: '',
          f_area: '',
          f_money: '',
          f_info: '',
          f_firstpic: '',
          f_pic: ''
        }
      }
    },
    methods: {
    	sub() {
    		api.getUser('/filmmessage/add', this.form).then((res) => {
    		 this.$message({
		          message: '添加成功',
		          type: 'success'
		        });
    		})
    		this.form = {}
    	},
    	back() {
    		Router.push("manager")
    	},
    	submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style>
	.el-form-item {
		margin-bottom: 10px;
	}
</style>