<template>
    <div class='home'>
        <el-container>
            <el-aside width="auto" style='overflow:hidden'>
                <el-menu class='el-menu-admin' background-color='#311b92' :default-active="$route.path" @open="handleOpen" @close="handleClose" text-color="#fff" active-text-color="#ffd04b" :collapse='isCollapse' :router='true' :unique-opened='true'>
                    <el-menu-item index="/users">
                        <i class="iconfont icon-user"></i>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-submenu index>
                        <template slot="title">
                            <i class=" iconfont icon-menu"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item index="/firstcategory">一级分类</el-menu-item>
                        <el-menu-item index="/secondcategroy">二级分类</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/product">
                        <i class=" iconfont icon-shopping"></i>
                        <span>商品管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style='height:95px'>
                    <ban v-on:toggleEvent='gettoggleValue'></ban>
                </el-header>
                <el-main style='background-color:#f4f6f8'>
                    <router-view class='router_page'/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import ban from './Header/Header'
import {checklogin} from '@/API/index.js'
export default {
  components: {
    ban
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    gettoggleValue (isCollapsevalue) {
      this.isCollapse = isCollapsevalue
    }
  },
  // 添加单组件导航
  beforeRouteEnter (to, from, next) {
    // 验证登陆
    checklogin().then(res => {
      if (res.success === true) {
        // 验证为已登录下一步
        next(vm => {})
      } else {
        next(vm => {
          // 创建vm实例后
          vm.$router.push({name: 'login'})
        })
      }
    })
  },
  mounted () {
    // 刷新时将当前路由加入tabs
    if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') === -1) {
      this.$store.commit('add_tabs', {route: '/', name: 'home'})
      this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.name})
      this.store.commit('ser_active_index', this.$route.path)
    } else {
      this.$store.commit('add_tabs', {route: '/', name: 'home'})
      this.$store.commit('set_active_index', '/')
      this.$router.push('/')
    }
  },
  computed: {
    option () {
      return this.$store.state.options
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header{
      height: 80px;
  }
  .el-aside{
      background-color: #311b92;
  }
  .router_page{
     background-color: #fff;
     padding:30px 15px;
     min-height: 400px;
  }
}
</style>
