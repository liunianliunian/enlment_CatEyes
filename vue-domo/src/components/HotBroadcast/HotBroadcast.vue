<template>
<div class="basetable">
    <div style="margin-top: 15px;" >
      <el-input placeholder="请输入内容" v-model="input5" style="width:500px">
        <el-select v-model="select" slot="prepend" placeholder="请选择" >
          <el-option label="电影名" value="1"></el-option>
          <el-option label="主演" value="2"></el-option>
          <el-option label="上映时间" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="searchFilm"></el-button>
      </el-input>
      <el-button type="primary" @click="addFilm" ><i class="el-icon-plus"></i> 新增电影</el-button>
      <el-button type="danger" @click="delFilm(multipleSelection)"><i class="el-icon-delete"></i> 批量删除</el-button>
    </div>
  
  <div class="tableMain">
    <el-table :data="page.rows" style="width: 100%"  ref="multipleTable"
    @selection-change="handleSelectionChange" @row-click="toggleRowSelection">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
      fixed
      prop="f_chn"
      label="电影中文名"
      width="150" >
    </el-table-column>
    <el-table-column
      prop="f_eng"
      label="电影英文名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="f_type"
      label="电影类型"
      width="120">
    </el-table-column>
     <el-table-column
      prop="f_garde"
      label="评分"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      prop="f_perfor"
      label="电影主演"
      width="120">
    </el-table-column> -->
    <el-table-column
      prop="f_look"
      label="想看人数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="f_address"
      label="电影产地"
      width="120">
    </el-table-column>
    <el-table-column
      prop="f_year"
      label="上映时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="f_time"
      label="电影时长"
      width="100">
    </el-table-column>
    <el-table-column
      prop="f_area"
      label="上映地区"
      width="100">
    </el-table-column>
    <el-table-column
      prop="f_money"
      label="电影票房"
      width="120">
    </el-table-column>
    <!-- <el-table-column
      prop="f_info"
      label="电影简介"
      width="250">
    </el-table-column> -->
      <el-table-column label="操作">
        <template scope="scope">
       <el-button  @click="handleChange(scope.row)" type="text" size="small"><i class="el-icon-edit"></i> 修改</el-button>
       <el-button
         size="small"
         type="danger"
         @click="handleDelete(scope.row)"><i class="el-icon-delete2"></i> 删除</el-button>
     </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.page.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
  <el-dialog title="修改电影信息" :visible.sync="dialogFormVisible">
         <el-form :model="form">
          <el-form-item label="电影中文名" :label-width="formLabelWidth">
            <el-input v-model="form.f_chn" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电影英文名" :label-width="formLabelWidth">
            <el-input v-model="form.f_eng" auto-complete="off"></el-input>
            </el-date-picker>
          </el-form-item>
          <el-form-item label="电影类型" :label-width="formLabelWidth">
            <el-input v-model="form.f_type" auto-complete="off"></el-input>
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeInfo">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加电影部分弹窗 -->
       <el-dialog title="添加电影(来源于电影片库)" :visible.sync="dialogAddFilm">
        <el-table
            :data="pages.rows"
            border
            style="width: 100%; max-height: 1000px"
            >
            <el-table-column
              fixed
              prop="f_chn"
              label="电影中文名"
              width="150" >
            </el-table-column>
            <el-table-column
              prop="f_eng"
              label="电影英文名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="f_type"
              label="电影类型"
              width="120">
            </el-table-column>
             <el-table-column
              prop="f_garde"
              label="评分"
              width="150">
            </el-table-column>
            <el-table-column
              prop="f_reletime"
              label="上映时间"
              width="120">
            </el-table-column>
            <el-table-column
              prop="f_area"
              label="上映地区"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button  @click="addFilmDetail(scope.row)" type="text" size="small">点击添加</el-button>       
              </template>
            </el-table-column>
          </el-table>
          <!-- 添加电影弹窗下部翻页 -->
          <el-pagination
            @size-change="handleSizeChanges"
            @current-change="handleCurrentChanges"
            :page-sizes="[5]"
            :page-size="this.pages.eachpage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pages.total">
          </el-pagination>
       </el-dialog>
</div>
</template>

<script >
import api from "../../api/index.js"
export default {
  data(){
        return {
          formLabelWidth: '80px',
          dialogFormVisible: false,
          input5: '',
          select: '',
          page: {
            curpage:1,
            eacpage:5,
            maxpage:0,
            rows:[],
            count:0
          },
          form:{},
          id:"",
          pages: {
            curpages:1,
            eacpages:5,
            maxpages:0,
            rowss:[],
            counts:0
          },
          dialogAddFilm: false ,
          ids:[]
        }
      },
  created(){
          api.getUser('/test/find',{page:this.page.curpage,rows:this.page.eacpage}).then((res)=>{
            this.page=res.data
          })
          api.getUser('/film/find',{page:this.pages.curpages,rows:this.pages.eacpages}).then((res)=>{
            this.pages=res.data
            console.log(this.pages)
          })
        },
  methods: {
   // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var a=row._id
        api.getUser('/test/del',{_id:a}).then((res)=>{
          console.log(1546531531)
          this.page=res.data
        });
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
    // 每页
      handleSizeChange(val) {
          api.getUser('/test/find',{page:this.page.curpage,rows:val}).then((res)=>{
          this.page=res.data
          this.page.eachpage=val
        })
      },
      // 当前页
      handleCurrentChange(val) {
          api.getUser('/test/find',{page:val,rows:this.page.eachpage}).then((res)=>{
          this.page=res.data
          this.page.curpage=val
        })
      },
      // 点击查询
      searchFilm(){

        var selectChoose = this.input5
        switch(this.select){
          case "1":
            api.getUser('/test/find',{f_chn:selectChoose,page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
              this.page=res.data
            });
            break;
          case "2":
          api.getUser('/test/find',{f_perfor:selectChoose,page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
            this.page=res.data
          });
          break;
          case "3":
          api.getUser('/test/find',{f_reletime:selectChoose,page:this.page.curpage,rows:this.page.eachpage}).then((res)=>{
            this.page=res.data
          });
          break;
        } 
      },
       // 添加电影
      addFilm(){
        
        this.dialogAddFilm = true
      },  
      // 添加电影的弹窗部分按钮
      addFilmDetail(row){ 
          api.getUser('/test/add',row).then((res)=>{
          this.page=res.data
        })
      },
      // 弹窗添加每页
      handleSizeChanges(val) {
          api.getUser('/film/find',{page:this.pages.curpage,rowss:val}).then((res)=>{
          this.pages=res.data
          this.pages.eachpage=val
        })
      },
      // 弹窗添加当前页
      handleCurrentChanges(val) {
          api.getUser('/film/find',{page:val,rows:this.pages.eachpage}).then((res)=>{
          this.pages=res.data
          this.pages.curpage=val
        })
      },
        // 修改
      handleChange(row){
        this.id=row._id
        this.form=row
        this.dialogFormVisible = true   
      },
      // 刷新修改页面
      changeInfo(){
          const data={
            _id:this.id,
            f_chn:this.form.f_chn,
            f_eng:this.form.f_eng,
            f_type:this.form.f_type,
            page:this.page.curpage,
            rows:this.page.eacpage
          }
          api.getUser('/test/update',data).then((res)=>{
            this.page=res.data
          })
          this.dialogFormVisible = false
      },
      // 批量删除
      delFilm(multipleSelection){
        var ids =[]
        for(var key of this.multipleSelection){
          ids.push(key._id)
        }
        api.getUser('/test/del',{ids:ids}).then((res)=>{
          this.page = res.data
        })
      },
      // 获取多项数据的id
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      // 复选框
      toggleRowSelection(val){
        this.$refs.multipleTable.toggleRowSelection(val)
      }
  }
}
</script>
<style>
.el-select .el-input {
    width: 110px;
  }
.basetable {
    .tableMain {
        margin: {
            top: 10px;
        };
    }
    .page {
       
        margin: {
            top: 10px;
        };
    }
}
</style>