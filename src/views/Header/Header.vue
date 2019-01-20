<template>
    <div class='header'>
        <div class='togglenav'>
            <i class='iconfont icon-menu1 toggle-btn' @click="toggleNav"></i>
            <i class='iconfont icon-tuichu loginout' @click="loginout">退出</i>
        </div>
        <div class='tab'>
          <el-tabs v-model="activeIndex" type="border-card" closable @tab-click="tabClick" v-if='options.length' @tab-remove='tabRemove' style='height:41px'>
  <el-tab-pane
  size="small"
    :key="item.name"
    v-for="(item) in options"
    :label="item.name"
    :name="item.route"
  >
  </el-tab-pane>
</el-tabs>
        </div>
    </div>
</template>
<script>
import {logout} from '@/API/index.js'
export default {
  data () {
    return {
      isCollapsevalue: false
    }
  },
  methods: {
    // 点击tab
    tabClick (tab) {
      let path = this.activeIndex
      if (this.activeIndex === '/userInfo') {
        path = this.activeIndex + '/' + this.$store.state.userInfo.name
      }
      this.$router.push({path: path})
    },
    // 删除
    tabRemove (targetName) {
      if (targetName === '/') {
        return false
      }
      this.$store.commit('delete_tabs', targetName)
      // 设置当前激活
      if (this.activeIndex === targetName) {
        if (this.options && this.options.length >= 1) {
          this.$store.commit('set_active_index', this.options[this.options.length - 1].route)
          this.$router.push({path: this.activeIndex})
        } else {
          this.$rouer.push({path: '/'})
        }
      }
    },
    // 点击切换左侧状态栏
    toggleNav () {
      this.isCollapsevalue = !this.isCollapsevalue
      this.$emit('toggleEvent', this.isCollapsevalue)
    },
    // 退出
    loginout () {
      logout().then(res => {
        console.log(res)
        if (res.success === true) {
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          this.$store.commit('loginout')
          this.$router.push({name: 'login'})
        }
      })
    }
  },
  computed: {
    options () {
      return this.$store.state.options
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex
      },
      set (val) {
        this.$store.commit('set_active_index', val)
      }
    }
  },
  watch: {
    $route (to) {
      let flag = false
      for (let option of this.options) {
        if (option.name === to.name) {
          flag = true
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {
          route: '/' + to.path.split('/')[1],
          name: to.name
        })
        this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  .togglenav {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-right:20px;
  }
  i {
    font-size: 20px;
  }
  .toggle-btn {
    height: auto;
    line-height: 1;
    padding: 4px 6px;
    color: #fff;
    background-color: #5cb85c;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      background-color: #4292cf;
    }
  }
  .loginout {
    cursor: pointer;
    font-size: 16px;
    color: #4292cf;
  }
  .tab {
    display: flex;
    align-items: center;
  }
}
</style>
