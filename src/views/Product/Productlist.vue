<template>
  <div class='productList'>
    <!--添加商品  -->
    <el-button type="primary" style='margin-bottom:15px' @click='showproductDialog'>添加商品</el-button>
    <!-- 表格 -->
    <el-table :data="producttableData" stripe style="width: 100%" border>
      <el-table-column type="selection" width="30">
      </el-table-column>
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="proName" label="商品名称" width="480">
      </el-table-column>
      <el-table-column prop="proDesc" label="商品描述">
      </el-table-column>
      <el-table-column prop="num" label="商品库存">
      </el-table-column>
      <el-table-column prop="size" label="商品尺寸">
      </el-table-column>
      <el-table-column label="是否下架">
        <!-- template模板过滤 -->
        <template slot-scope="scope">
          <span>{{scope.row.statu | statuFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页器 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1, 2, 3, 4]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="Alltotal" style="background:#f3f3f3;margin-top:8px">
        </el-pagination>
        <el-dialog title="添加商品" :visible.sync="productdialogFormVisible">
      <el-card class="box-card">
        <el-form :model="addProductform" ref='addProductform' :rules="rules">
          <el-form-item label="请选择品牌">
            <el-select v-model="addProductform.brandId" placeholder="请选择">
              <el-option :value="item.id" v-for='item in brandList' :key='item.id' :label='item.brandName'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop='proName'>
            <el-input placeholder="请输入产品名称" v-model='addProductform.proName'  clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop='proDesc'>
            <el-input placeholder="请输入产品描述" v-model='addProductform.proDesc' clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop='num'>
            <el-input placeholder="请输入产品数量" v-model='addProductform.num' clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop='size'>
            <el-input placeholder="请输入产品尺码,如20-39" v-model='addProductform.size' clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop='oldPrice'>
            <el-input placeholder="请输入商品原价" v-model='addProductform.oldPrice' clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop='price'>
            <el-input placeholder="请输入商品折扣价" v-model='addProductform.price' clearable auto-complete="off">
            </el-input>
          </el-form-item>
          <!-- 图片上传 -->
          <el-upload
  class="upload-demo"
  action="http://localhost:3000/product/addProductPic"
  name='pic1'
  :with-credentials='true'
   multiple
  :limit=3
  :on-preview="handlePreview"
  list-type="picture">
  <el-button size="small" type="primary">选择需要上传的图片</el-button>
  <div slot="tip" class="el-upload__tip">**请选择三张图片</div>
</el-upload>
        </el-form>
      </el-card>
              <div slot="footer" class="dialog-footer">
          <el-button @click="productdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addproductEvent('addProductform')">确 定</el-button>
        </div>
    </el-dialog>
        <!-- 图片预览框 -->
    <el-dialog :visible.sync="previewdialogVisible" width="40%">
      <img :src="imgsrc" alt="" style='width:100%;display:block'>
    </el-dialog>
  </div>
</template>

<script>
import {getproductList, querySecond, addProductData} from '@/API/index.js'
export default {
  data () {
    return {
      page: 1,
      pagesize: 4,
      brandpagesize: 10,
      Alltotal: 1,
      producttableData: [],
      brandList: [],
      // 对话框
      productdialogFormVisible: false,
      previewdialogVisible: false,
      imgsrc: '',
      addProductform: {
        brandId: '',
        proName: '',
        proDesc: '',
        num: '',
        size: '',
        oldPrice: '',
        price: '',
        statu: ''
      },
      // 验证规则
      rules: {
        proName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        proDesc: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入产品数量', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入产品尺码', trigger: 'blur' }
        ],
        oldPrice: [
          { required: true, message: '请输入商品原价', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品折扣价', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showproductDialog () {
      this.productdialogFormVisible = true
      // 获取二级分类列表
      querySecond({page: this.page, pageSize: this.brandpagesize}).then(res => {
        console.log(res)
        this.brandList = res.rows
      })
    },
    initList () {
      getproductList({ page: this.page, pageSize: this.pagesize }).then(res => {
        console.log(res)
        this.producttableData = res.rows
        this.Alltotal = res.total
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.initList()
    },
    // 图片预览
    handlePreview (file) {
      console.log(file)
      this.previewdialogVisible = true
      this.imgsrc = 'http://localhost:3000' + file.response.picAddr
    },
    addproductEvent (formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          addProductData(this.addProductform).then(res => {
            console.log(res)
            if (res.success === true) {
              this.productdialogFormVisible = false
              this.initList()
              this.$refs['addProductform'].resetFields()
              this.$message({
                message: '添加商品成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '添加商品失败',
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.initList()
  },
  // 过滤器
  filters: {
    statuFormat (statu) {
      if (statu === 1) {
        return '已上架产品'
      } else {
        return '已下架产品'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
