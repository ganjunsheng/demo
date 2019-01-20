<template>
    <div class='Secondcategroy'>
        <el-button type="primary" plain @click='showdialog'>添加品牌</el-button>
        <el-card shadow="hover" style="margin-top:15px">
            <el-table :data="secondtableData" height="360" border style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="品牌编号" width="180">
                </el-table-column>
                <el-table-column prop="brandName" label="品牌名称" width="180">
                </el-table-column>
                <el-table-column prop="address" label="品牌logo">
                    <template slot-scope="scope">
                        <img :src="'http://localhost:3000'+scope.row.brandLogo" alt="" style="display:block;width:50%">
                    </template>
                </el-table-column>
                <el-table-column prop="categoryName" label="所属分类">
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 添加品牌对话框 -->
        <el-dialog title="添加分类" :visible.sync="adddialogForm" label-width="120px">
            <el-form :model="secondform" :rules="rules" ref="secondform">
                <el-form-item label="请选择分类">
                    <el-select v-model="secondform.categoryId" placeholder="请选择">
                        <el-option :label="item.categoryName" :value="item.id" v-for='(item) in msg' :key='item.id'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop='brandName'>
                    <el-input v-model="secondform.brandName" placeholder='请输入品牌名称' autocomplete="off"></el-input>
                </el-form-item>
                <!-- 图片上传 -->
                <el-upload class="upload-demo" action="http://localhost:3000/category/addSecondCategoryPic" :on-preview="handlePreview" :limit=1 :on-remove="handleRemove" list-type="picture" name='pic1' :with-credentials='true' :on-success='uploadDone' :before-upload='uploadBeforeValid'>
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogForm = false">取 消</el-button>
                <el-button type="primary" @click="updateSecondCategory('secondform')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 图片预览框 -->
        <el-dialog :visible.sync="previewdialogVisible" width="40%">
            <img :src="imgsrc" alt="" style='width:100%;display:block'>
    </el-dialog>
    </div>
</template>

<script>
import { querySecond, firstList, addsecondbrand } from '@/API/index.js'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      secondtableData: [],
      adddialogForm: false,
      previewdialogVisible: false,
      msg: [],
      imgsrc: '',
      secondform: {
        categoryId: '',
        brandName: '',
        brandLogo: '',
        hot: 1
      },
      rules: {
        brandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查询品牌
    init () {
      querySecond({ page: this.page, pageSize: this.pageSize }).then(res => {
        console.log(res)
        this.secondtableData = res.rows
      })
    },
    showdialog () {
      this.adddialogForm = true
      // 查询一级分类
      firstList({ page: this.page, pageSize: this.pageSize }).then(res => {
        console.log(res)
        this.msg = res.rows
      })
    },
    // 文件删除
    handleRemove (file, fileList) {
      console.log(file, fileList)
      if (!file.response) {
        return false
      }
      // 品牌图片路径移出
      this.secondform.brandLogo = ''
    },
    // 图片预览
    handlePreview (file) {
      console.log(file)
      this.previewdialogVisible = true
      this.imgsrc = 'http://localhost:3000' + file.response.picAddr
    },
    // 文件上传成功后的
    uploadDone (response, file, fileList) {
      console.log(response, file, fileList)
      // 赋值对象
      this.secondform.brandLogo = response.picAddr
    },
    uploadBeforeValid (file) {
      if (file.size > 500 * 1024) {
        this.$message({
          message: '文件大小不能超过500KB',
          type: 'warning'
        })
        return false
      }
    },
    // 添加品牌
    updateSecondCategory (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addsecondbrand(this.secondform).then(res => {
            if (res.success === true) {
              this.adddialogForm = false
              this.$message({
                message: '添加品牌成功',
                type: 'success'
              })
              this.init()
              this.$refs['secondform'].resetFields()
            } else {
              this.$message.error('添加失败')
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang='scss' scoped>
</style>
