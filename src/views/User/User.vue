<template>
  <div class='user'>
    <el-card shadow="hover">
      <el-table border
    :data="usertableData"
    style="width: 100%"
    height='400px'>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="用户名"
      width="180"
      prop='username'>
    </el-table-column>
    <el-table-column
      label="电话"
      width="180"
      prop='mobile'>
    </el-table-column>
    <el-table-column
      label="状态栏"
      width="180">
      <template slot-scope="scope">
         <!-- 模板过滤数据 -->
         <span>{{scope.row.isDelete|isdeleteForm}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button :type="scope.row.isDelete?'danger':'success'" plain @click='changeupdateUser(scope.row)'>{{scope.row.isDelete?'禁用':'启用'}}</el-button>
      </template>
    </el-table-column>
  </el-table>
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next"
      :total="num">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {userList, updateUser} from '@/API/index.js'
export default {
  data () {
    return {
      page: 1,
      pageSize: 10,
      currentPage: 1,
      usertableData: [],
      num: 1
    }
  },
  methods: {
    init () {
      userList({page: this.page, pageSize: this.pageSize}).then(res => {
        // console.log(res)
        this.usertableData = res.rows
        this.num = res.total
      })
    },
    changeupdateUser (row) {
      // console.log(row)
      let value = row.isDelete ? 0 : 1
      console.log(value)
      updateUser({id: row.id, isDelete: value}).then(res => {
        if (res.success === true) {
          this.init()
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    this.init()
  },
  // 过滤器
  filters: {
    isdeleteForm (isDelete) {
      if (isDelete === 0) {
        return '已禁用'
      } else {
        return '已启用'
      }
    }
  }
}
</script>

<style scoped>
</style>
