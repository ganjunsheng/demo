<template>
    <div class='firstCategory'>
        <el-button type="primary" plain @click='showdialog'>添加分类</el-button>
        <el-card shadow="hover" style="margin-top:15px">
            <el-table :data="firsttableData" style="width: 100%" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="分类的编号">
                </el-table-column>
                <el-table-column prop="categoryName" label="分类的名称">
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 4, 6, 8]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="alltotal">
            </el-pagination>
        </el-card>
        <!-- 对话框 -->
        <el-dialog title="添加分类" :visible.sync="adddialogFormfirst" label-width="120px">
            <el-form :model="addfirstform" :rules="rules" ref='addfirstform'>
                <el-form-item prop='categoryName'>
                    <el-input placeholder="请输入分类名称" v-model="addfirstform.categoryName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="adddialogFormfirst = false">取 消</el-button>
                <el-button type="primary" @click="addfirstdata('addfirstform')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { firstList, addtopcategory } from '@/API/index.js'
export default {
  data () {
    return {
      page: 1,
      pageSize: 4,
      firsttableData: [],
      alltotal: 1,
      currentPage: 1,
      adddialogFormfirst: false,
      addfirstform: {
        categoryName: ''
      },
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      firstList({ page: this.page, pageSize: this.pageSize }).then(res => {
        console.log(res)
        this.firsttableData = res.rows
        this.alltotal = res.total
      })
    },
    // 分页器
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.init()
    },
    showdialog () {
      // 显示对话框
      this.adddialogFormfirst = true
    },
    // 增加分类
    addfirstdata (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addtopcategory({categoryName: this.addfirstform.categoryName}).then(res => {
            if (res.success === true) {
              this.$message({
                message: '添加分类成功',
                type: 'success'
              })
              // 清空表单
              this.$refs['addfirstform'].resetFields()
              this.init()
              this.adddialogFormfirst = false
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
